import {Router} from "express"
import { ProductManager } from "../controllers/ProductManager.js"

const routerProduct = Router()
const manager = new ProductManager("./models/products.txt")


routerProduct.get("/products", async(req,res)=>{
    const products = await manager.getProducts();
    let { limit } = req.query;
    let data;
    if (!limit) {
        data = products;
    } else {
        data = products.slice(0, parseInt(limit));
    }
    res.send(data);
})




routerProduct.get("/products/:pid",async(req,res)=>{
    const product = await manager.getProductById(parseInt(req.params.pid))
    if(!product){
        res.send("Usuario no encontrado")
    }
    res.send(product)
})

//esta mal el indice autoincrementable
//con el metodo get en postman no me aparece el producto que agregue, pero en la consola si me aparece
routerProduct.post("/products", async(req,res)=>{
    const products = await manager.getProducts();
    let {title, description, price, thumbnail, code, stock} = req.body;
    const indice = products.length;
    products.push({title:title, description:description, price:price, thumbnail:thumbnail, code:code, stock:stock, id:indice+1});
    res.send("Usuario Creado");
})

//cuando actualizo en postman me aparece error en la consola y no se guarda
routerProduct.put("/products/:pid", async(req,res)=>{
    const products = await manager.getProducts();
    let {title, description, price, thumbnail, code, stock} = req.body;

    if(products.some(p=>p.id=== parseInt(req.params.pid))){
        const indice = products.findIndex(p=>p.id === parseInt(req.params.pid))
        products[indice].title = title;
        products[indice].description = description;
        products[indice].price = price;
        products[indice].thumbnail = thumbnail;
        products[indice].code = code;
        products[indice].stock = stock;

        res.send("Usuario actualizado")
   }
   res.send("Usuario no encontrado")
})

// me aparece el mismo error que arriba
routerProduct.delete("/products/:pid",async(req,res)=>{
    const product = await manager.getProducts();
    const indice = product.findIndex(p=>p.id === parseInt(req.params.pid));
    if(indice != -1){
        product.splice(indice,1)
        res.send("Usuario Elimiando")
    }
    res.send(product)
})


export default routerProduct;