import ProductManager from "./ProductManager.js"
import express from "express"

const app = express()
const PORT = 8080 
const manager = new ProductManager("./src/products.txt")

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get("/", async(req,res)=>{
    res.send("Mi primer servidor con express")
})


app.get("/products", async(req,res)=>{
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




app.get("/products/:pid",async(req,res)=>{
    const product = await manager.getProductById(parseInt(req.params.pid))
    if(!product){
        res.send("Usuario no encontrado")
    }
    res.send(product)
})

app.listen(PORT,()=>{
    console.log(`Sever on port ${PORT}`);
})
