import {existsSync,promises as fs} from "fs";




class Cart {
    constructor(id, products) {
        this.id = id;
        this.products = products;
    }
}



export class CartManager{
    constructor(path){
        this.path = path;
    }
   

    checkText = () => {
        //Creamos archivo TXT DE carrito
        !existsSync(this.path) && fs.writeFile(this.path, "[]", 'utf-8');
    }


    async addCart(){
        this.checkText()
        // try{
            const read = JSON.parse(await fs.readFile(this.path,"utf-8"));
            let newId;
            read.length > 0 ? newId = read[read.length -1].id + 1: newId = 1;
            const newCart = new Cart (newId, []);
            read.push(newCart)
            await fs.writeFile(this.path, JSON.stringify(read))
            return newId
        // }catch{
        //     return "Hubo un error al agregar el carrito"
        // }
        
    }



    async getCartById(idCart){
        this.checkText()
        try{
            const read = JSON.parse(await fs.readFile(this.path, "utf-8"));
            let cartIndex = read.findIndex(cart=> cart.id === parseInt(idCart));

            if(read[cartIndex]){
                return read[cartIndex]
            }else{
                return "Carrito con id puesto no encontrado"
            }

        }catch{
            return "No se encontró ningún carrito"
        }
        
    }


    async addProductToCart(idCart,idProduct, prodQty){
        this.checkText()
        const read = JSON.parse(await fs.readFile(this.path, "utf-8"))
        //miramos si el carrito con ese id existe
        if(read.some(cart=> cart.id === parseInt(idCart))){
            //obtengo el indice del array de carrito
            const cartIndex = read.findIndex(cart=> cart.id === parseInt(idCart))
            //obetenemos el indice del producto dentro del carrito
            const objectCart = new Cart(idCart, read[cartIndex].products)
            const prodIndex = objectCart.products.findIndex(obj=>obj.product === parseInt(idProduct))
            
            if(prodIndex === -1){
                //si no existe pusheamos el producto en el array de productos dentro del carrito
                objectCart.products.push({product:idProduct, quantity:prodQty})
                //actualizo el carrito en el array de carritos
                read[cartIndex] = objectCart
            }else{
                read[cartIndex].products[prodIndex].quantity += prodQty
            }

            await fs.writeFile(this.path, JSON.stringify(read), "utf-8")
            return "Producto agregado al carrito"
        }else{
            "Hubo un error al agregar el producto al carrito"
        }
    }



}
