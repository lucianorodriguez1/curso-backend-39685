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

//esta mal el indice autoincrementable
//con el metodo get en postman no me aparece el producto que agregue, pero en la consola si me aparece
app.post("/products", async(req,res)=>{
    const products = await manager.getProducts();
    let {title, description, price, thumbnail, code, stock} = req.body;
    const indice = products.length;
    products.push({title:title, description:description, price:price, thumbnail:thumbnail, code:code, stock:stock, id:indice+1});
    res.send("Usuario Creado");
    // console.log(products);
})

//cuando actualizo en postman me aparece error en la consola y no se guarda
app.put("/products/:pid", async(req,res)=>{
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
app.delete("/products/:pid",async(req,res)=>{
    const product = await manager.getProducts();
    const indice = product.findIndex(p=>p.id === parseInt(req.params.pid));
    if(indice != -1){
        product.splice(indice,1)
        res.send("Usuario Elimiando")
    }
    res.send(product)
})


app.listen(PORT,()=>{
    console.log(`Sever on port ${PORT}`);
})
