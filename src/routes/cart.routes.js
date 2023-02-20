import {Router} from "express" 
import {CartManager} from "../controllers/CartManager.js"
import { ProductManager } from "../controllers/ProductManager.js"

const routerCart = Router()
const managerCart = new CartManager("./src/models/carts.txt")
const managerProduct = new ProductManager("./src/models/products.txt")




routerCart.post("/", async(req,res)=>{
    let product = await managerCart.addCart();
    res.send({product})
})
 
routerCart.get("/:cid", async(req,res)=>{
    let cart = await managerCart.getCartById(parseInt(req.params.cid))
    res.send(cart)
})


routerCart.post("/:cid/product/:pid", async(req,res)=>{
    const prodQty = 1
    const productData = await managerProduct.getProductById(parseInt(req.params.pid))

    if(productData){
        const data = await managerCart.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid),prodQty)
        data ? res.send(`Producto ${productData.id} agregado al carrito`) : res.send("Hubo un error al agregar al carrito")
    }else{
        res.send(`El producto ${req.params.pid} no se ha encontrado`)
    }
})

routerCart.delete('/:cid', async (req, res) => {
    let mensaje = await managerCart.deleteCart(req.params.cid) 
    res.send(mensaje)
})

routerCart.delete('/:cid/product/:pid', async (req, res) => { 
    const cartData = await managerCart.getCartById(parseInt(req.params.cid));
    if (cartData) {
        const data = await managerCart.deleteProductFromCart(parseInt(req.params.cid), parseInt(req.params.pid))
        data ? res.send(`Producto ${req.params.pid} eliminado del carrito.`) : res.send(`Hubo un error al eliminar el producto del carrito.`)
    } else {
        res.send(`El producto ${req.params.pid} no se ha encontrado.`)
    }
    
})

export default routerCart