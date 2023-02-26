import {Router} from "express";
import { ProductManager } from "../controllers/ProductManager.js";

const routerSocket = Router();
const productManager = new ProductManager("./src/models/products.txt")


routerSocket.get("/", async(req,res)=>{
    const products = await productManager.getProducts()
    res.render("home", { //renderiza el siguiente contenido
        products
    })
}) 

routerSocket.get("/realtimeproducts", async(req,res)=>{
    const products = await productManager.getProducts()
    res.render("realtimeproducts",{
       products:products
    })
})
 

export default routerSocket