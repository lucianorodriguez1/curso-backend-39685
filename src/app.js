import express from "express"
import routerProduct from "./routes/products.routes.js"
import routerCart from "./routes/cart.routes.js"
import { __dirname } from "./path.js"
import multer from "multer"
import {engine} from "express-handlebars"
import * as path from "path"
import { Server } from "socket.io"

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

//server de socket io
const io = new Server(server)

io.on("connection", (socket)=>{  //io.on es cuando establezco la conexion
    console.log("Cliente conectado");

    socket.on("mensaje",info=>{  //cuando recibo informacion de mi cliente
        console.log(info);
    })

    socket.emit("Mensaje general", "Hola desde mensaje general")
    socket. broadcast.emit("Mensaje-socket-propio", "Hola desde mensaje socket propio")//envio un mensaje a todos los clientes conmectado a los otros sockets menos a los que estan conectado a este socket
})
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
app.use("/", express.static(__dirname + "/public"))
//routes-handlebars
app.get("/", (req,res)=>{
    res.render("home", {
        mensaje:"Luciano"
    })
})

