import {promises as fs} from "fs";
const ruta = "./src/models/carts.txt"

export class CartManager{
    constructor(path){
        this.path = path;
    }
   

    static addId(){
        if(this.idIncrement){
            this.idIncrement++
        }else{
            this.idIncrement = 1
        }
        return this.idIncrement
    }

    async addCart(cart){
        const read = JSON.parse(await fs.readFile(this.path,"utf-8"));
        read.push(cart)
        await fs.writeFile(this.path, JSON.stringify(read))
    }

    async getProducts(){
        try{
            const read = JSON.parse(await fs.readFile(this.path, "utf-8"))
            return read;
        }catch(error){
            return error
        }
    }
    

    async getProductById(id){
        const read = JSON.parse(await fs.readFile(this.path, "utf-8"));
        if(read.some(prod=>prod.id === parseInt(id))){
            return prods.find(prod => prod.id === parseInt(id))
        }else{
            return "Producto no encontrado"
        }
    }


}






const manager = new CartManager(ruta)

const test = async()=>{
    await fs.writeFile(ruta,"[]")
}
 test()