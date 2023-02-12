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



app.get("/products/:pid",(req,res)=>{
    const pid = req.params.pid
    const product = manager.getProductById(pid)
    if(!product){
        return res.send({error: "Usuario No encontrado"})
    } 
    res.send(product)
})

app.listen(PORT,()=>{
    console.log(`Sever on port ${PORT}`);
})
