import express from "express"
import routerProduct from "./routes/products.routes.js"
import routerCart from "./routes/cart.routes.js"
import { __dirname } from "./path.js"
import multer from "multer"
import {engine} from "express-handlebars"
import * as path from "path"
import { Server } from "socket.io"
import routerSocket from "./routes/socket.routes.js"

const app = express()
const PORT = 8080 

const server = app.listen(PORT,()=>{
    console.log(`Sever on port ${PORT}`);
})



//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//middleware-handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views",  path.resolve(__dirname ,"./views"))



//multer
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"src/public/img")
    },
    filename:(req,file,cb)=>{
        cb(null, `${file.originalname}`)
    }
})

const upload = multer({storage:storage})

app.post("/upload",upload.single("product"),(req,res)=>{
    console.log(req.body);
    res.send("Imagen cargada")
})




//Routes
app.use("/api/products", routerProduct)
app.use("/api/carts", routerCart)
app.use("/", routerSocket)
app.use("/", express.static(__dirname + "/public"))



//server de socket io
const io = new Server(server)


//routes-handlebars
app.get("/", (req,res)=>{
    res.render("home", {
        mensaje:"Luciano"
    })
})

