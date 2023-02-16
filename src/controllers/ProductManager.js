import {promises as fs} from "fs";
const ruta = "./src/models/products.txt"


class Product{
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock
    }

    
}


 export class ProductManager{
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


    async addProduct (product){
        const prods = JSON.parse(await fs.readFile(this.path,"utf-8"))
        product.id = ProductManager.addId()
        prods.push(product)
        await fs.writeFile(this.path, JSON.stringify(prods))
        return "Product created"

    }



    async getProducts() {
        try{
            const prods = JSON.parse(await fs.readFile(this.path,"utf-8"))
            return prods
        }catch(error){
            return error
        }
        
    }

    async getProductById(id){
        const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
        if(prods.some(prod=>prod.id === parseInt(id))){
            return prods.find(prod => prod.id === parseInt(id))
        }else{
            return "Producto no encontrado"
        }
    }

    

    async updateProduct(id,{title,description,price,thumbnail,code,stock}){
        const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
        if(prods.some(prod=>prod.id === parseInt(id))){
            let index = prods.findIndex(prod=>prod.id ===parseInt(id))
            prods[index].title = title
            prods[index].description = description
            prods[index].price = price
            prods[index].thumbnail = thumbnail
            prods[index].code = code
            prods[index].stock = stock
            await fs.writeFile(this.path, JSON.stringify(prods))
            return "Producto actualizado"
        } else {
            return "Producto no encontrado"
        }
    }



    async deleteProduct(id){
        const prods = JSON.parse(await fs.readFile(this.path,"utf-8"))
        if(prods.some(prod=> prod.id === parseInt(id))){
            const prodsFiltrados = prods.filter(prod=>prod.id !== parseInt(id))
            await fs.writeFile(this.path, JSON.stringify(prodsFiltrados))
            return "Producto Eliminado"
        }else{
            return "Producto no encontrado"
        }
    }


    
}


//inicio product manager
const productManager = new ProductManager(ruta); 

//lista de productos
const product1 = new Product(
    "Placa de video 1050 ti",
    "Cuenta con 768 núcleos, los cálculos para el procesamiento de gráficos se realizarán de forma simultánea logrando un resultado óptimo del trabajo de la placa. Esto le permitirá ejecutar lecturas dispersas y rápidas de y hacia la GPU.",
    108239,
    "./img/1050ti.jfif",
    "#856wdv",
    233,
)

const product2 = new Product(
    "RTX 2060 SUPER",
    " su resolución de 7680x4320 no te defraudará. La decodificación de los píxeles en tu pantalla te harán ver hasta los detalles más ínfimos en cada ilustración.",
    184064,
    "./img/rtx2060super.webp",
    "#454djc",
    934,
)

const product3= new Product(
    "GTX 1660 SUPER",
    "cuenta con 1408 núcleos, los cálculos para el procesamiento de gráficos se realizarán de forma simultánea logrando un resultado óptimo del trabajo de la placa. Esto le permitirá ejecutar lecturas dispersas y rápidas de y hacia la GPU.",
    130589,
    "./img/gtx1660.jpeg",
    "#323djv",
    91,
)

const product4 = new Product(
    "RTX 3090",
    "su resolución de 7680x4320 no te defraudará. La decodificación de los píxeles en tu pantalla te harán ver hasta los detalles más ínfimos en cada ilustración.",
    410304,
    "rtx3090.webp",
    "#595jnd",
    40,
)
const product5 = new Product(
    "RTX 2070 SUPER",
    "PLACA DE VIDEO MSI GEFORCE RTX 2070 SUPER VENTUS GP OC (7464) (912-V386-001",
    178586,
    "./img/2070super.webp",
    "#405flc",
    975,
)

const product6 = new Product(
    "GTX 1060",
    "Proporciona una experiencia interactiva y cinemática, así como una acción increíblemente fluida.",
    114766,
    "./img/1060super.png",
    "#984jdv",
    20,
)

const product7 = new Product(
    "RTX 3060",
    "Este componente electrónico procesa la información que llega al dispositivo y los transforma en imágenes o videos para mostrarla visualmente. Es ideal para trabajar con aplicaciones gráficas ya que permite obtener imágenes más nítidas.",
    240569,
    "./img/rtx3060.webp",
    "#522hdx",
    60,
)

const product8 = new Product(
    "RTX 3070",
    "Cuenta con 6144 núcleos, por lo que la interfaz de la placa será algo sorprendente. Este tipo de estructura es apropiado para el procesamiento de tecnologías más complejas y modernas caracterizadas por grandes volúmenes de datos.",
    290099,
    "./img/rtx3060.webp",
    "#875ldc",
    249,
)

const product9 = new Product(
    "GTX 680",
    "Nvidia MSI GTX 680 Lightning 2GB",
    50005,
    "./img/gtx680.webp",
    "#854dñp",
    5004,
)

const product10 = new Product(
    "RTX 2080 Ti",
    "La placa de video orientada a juegos más potente del mercado. Excelentes condiciones, nunca se le hizo overclock no se la exigió más que para juegos.",
    204033,
    "./img/rtx2080ti.webp",
    "#124jcs",
    304,
)

const test = async()=>{
    //creo archivo de ruta
    await fs.writeFile(ruta,"[]")
    // el array de productos debe estar vacio
    // await productManager.getProducts()
    //agrego productos
    await productManager.addProduct(product1)
    await productManager.addProduct(product2)
    await productManager.addProduct(product3)
    await productManager.addProduct(product4)
    await productManager.addProduct(product5)
    await productManager.addProduct(product6)
    await productManager.addProduct(product7)
    await productManager.addProduct(product8)
    await productManager.addProduct(product9)
    await productManager.addProduct(product10)

    //llamo a la funcion para ver los nuevos productos
    await productManager.getProducts()
    //Busco productos por ID.
    // await productManager.getProductById(3)
    // await productManager.getProductById(9)
    //actualizo precio de un producto
    // await productManager.updateProduct(2, "price", 195843)
    //llamo a getproducts para ver la lista de productos con el producto 2 actualizado
    // await productManager.getProducts()
    //elimino el producto 3
    // await productManager.deleteProduct(3)
    //llamo a get products para ver nuevamente la lista de productos con el producto 3 eliminado
    // await productManager.getProducts()
}

test()


