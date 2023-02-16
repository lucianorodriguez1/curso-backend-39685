import {Router} from "express"
import { ProductManager } from "../controllers/ProductManager.js"

const routerProduct = Router()
const manager = new ProductManager("./src/models/products.txt")


routerProduct.get("/", async(req,res)=>{
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




routerProduct.get("/:pid",async(req,res)=>{
    const product = await manager.getProductById(parseInt(req.params.pid))
    if(!product){
        res.send("Usuario no encontrado")
    }
    res.send(product)
})


routerProduct.post("/", async(req,res)=>{
    const productAdd = await manager.addProduct(req.body);
    res.send(productAdd)
})

routerProduct.delete("/:pid",async(req,res)=>{
    const product = await manager.deleteProduct(req.params.pid);
    res.send(product)
})

routerProduct.put("/:pid", async(req,res)=>{
    let product = await manager.updateProduct(req.params.pid, req.body)
   res.send(product)
})





export default routerProduct;