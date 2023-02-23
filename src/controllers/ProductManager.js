import {promises as fs} from "fs";
const ruta = "./src/models/products.txt"


 
class Product{
    constructor(title, description, code, price, stock,category,thumbnail,status){
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.thumbnail = thumbnail;
        this.status = status;
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
        const prodCode = prods.map((prod)=>prod.code)
        const prodExist = prodCode.includes(product.code);
        if(prodExist){
            return console.log(`El codigo ${product.code} ya existe. Ingrese otro codigo`);
    
        }else if(Object.values(product).includes("") || Object.values(product).includes(null)){
            return console.log("Todos los campos deben ser completados");
        }else{
        
            const newProduct = {id:ProductManager.addId(),...product}
            prods.push(newProduct)
            await fs.writeFile(this.path, JSON.stringify(prods))
            return "Product created"  ;
        }
    
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

    

    async updateProduct(id,{title,description,code,price,stock,category,thumbnail}){
        const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
        if(prods.some(prod=>prod.id === parseInt(id))){
            let index = prods.findIndex(prod=>prod.id ===parseInt(id))
            prods[index].title = title
            prods[index].description = description
            prods[index].code = code
            prods[index].price = price
            prods[index].stock = stock
            prods[index].category = category
            prods[index].thumbnail = thumbnail
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
    "#856wdv",
    108239,
    233,
    "placa de video",
    "./img/1050ti.jfif",
    "true",
)

const product2 = new Product(
    "RTX 2060 SUPER",
    " su resolución de 7680x4320 no te defraudará. La decodificación de los píxeles en tu pantalla te harán ver hasta los detalles más ínfimos en cada ilustración.",
    "#454djc",
    184064,
    934,
    "placa de video",
    "./img/rtx2060super.webp",
    "true",
)

const product3= new Product(
    "GTX 1660 SUPER",
    "cuenta con 1408 núcleos, los cálculos para el procesamiento de gráficos se realizarán de forma simultánea logrando un resultado óptimo del trabajo de la placa. Esto le permitirá ejecutar lecturas dispersas y rápidas de y hacia la GPU.",
    "#323djv",
    130589,
    91,
    "placa de video",
    "./img/gtx1660.jpeg",
    "true",
    
   
)

const product4 = new Product(
    "RTX 3090",
    "su resolución de 7680x4320 no te defraudará. La decodificación de los píxeles en tu pantalla te harán ver hasta los detalles más ínfimos en cada ilustración.",
    "#595jnd",
    410304,
    40,
    "placa de video",
    "./img/rtx3090.webp",
    "true",
)
const product5 = new Product(
    "RTX 2070 SUPER",
    "PLACA DE VIDEO MSI GEFORCE RTX 2070 SUPER VENTUS GP OC (7464) (912-V386-001",
    "#405flc",
    178586,
    975,
    "placa de video",
    "./img/2070super.webp",
    "true",
    
)
 

const product6 = new Product(
    "GTX 1060",
    "Proporciona una experiencia interactiva y cinemática, así como una acción increíblemente fluida.",
    "#984jdv",
    114766,
    20,
    "placa de video",
    "./img/1060super.png",
    "true",
)
    
    

const product7 = new Product(
    "RTX 3060",
    "Este componente electrónico procesa la información que llega al dispositivo y los transforma en imágenes o videos para mostrarla visualmente. Es ideal para trabajar con aplicaciones gráficas ya que permite obtener imágenes más nítidas.",
    "#522hdx",
    240569,
    60,
    "placa de video",
    "./img/rtx3060.webp",
    "true",
)

const product8 = new Product(
    "RTX 3070",
    "Cuenta con 6144 núcleos, por lo que la interfaz de la placa será algo sorprendente. Este tipo de estructura es apropiado para el procesamiento de tecnologías más complejas y modernas caracterizadas por grandes volúmenes de datos.",
    "#875ldc",
    290099,
    249,
    "placa de video",
    "./img/rtx3060.webp",
    "true",
    
    
)

const product9 = new Product(
    "GTX 680",
    "Nvidia MSI GTX 680 Lightning 2GB",
    "#854dñp",
    50005,
    5004,
    "placa de video",
    "./img/gtx680.webp",    
    "true",
)

const product10 = new Product(
    "RTX 2080 Ti",
    "La placa de video orientada a juegos más potente del mercado. Excelentes condiciones, nunca se le hizo overclock no se la exigió más que para juegos.",
    "#124jcs",
    204033,
    304,
    "placa de video",
    "./img/rtx2080ti.webp",
    "true",
    
   
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


