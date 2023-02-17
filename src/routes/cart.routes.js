import {Router} from "express"
import {CartManager} from "../controllers/CartManager.js"

const routerCart = Router()
const manager = new CartManager("./src/models/carts.txt")

routerCart.post("/", async(req,res)=>{
    const productAdd = await manager.addCart(req.body);
    res.send(productAdd)
})

routerCart.get("/:cid", async(req,res)=>{
    let idCart = await manager.getCartById(req.params.cid)
    res.send(idCart)
})
routerCart.post("/:cid/product/:pid", async(req,res)=>{

})


export default routerCart