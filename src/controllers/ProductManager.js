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

    checkArchivo = ()=>{
        return fs.existsSync(this.path)       
    } 

    addProduct = async(product)=>{
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

    getProductById = async (id) => {
        const read = await fs.readFile(this.path, 'utf-8');
        const data = JSON.parse(read);
        const findProduct = data.find((prod) => prod.id === id);
        return findProduct
    }


    updateProduct = async (id, entry, value)=>{
        const read = await fs.readFile(this.path, "utf-8");
        const data = JSON.parse(read);
        const index = data.findIndex((product) => product.id === id);
        if(!data[index][entry]){
            return console.log("The product could not be updated");
        } else {
            data[index][entry]= value;
            await fs.writeFile(this.path, JSON.stringify(data, null,2))
            return console.log("The product was modified: " + data[index]);
        }
    }


    deleteProduct = async (id) => {
        const read = await fs.readFile(this.path, "utf-8")
        const data = JSON.parse(read)
        const productRemove = JSON.stringify(data.find((product) => product.id === id))
        const newData = data.filter((product)=> product.id !== id)

        await fs.writeFile(this.path, JSON.stringify(newData), "utf-8")
        return console.log("Not found ID");
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


