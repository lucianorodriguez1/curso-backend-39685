import express from "express"
import routerProduct from "./routes/products.routes.js"
import { __dirname } from "./path.js"
import multer from "multer"


const app = express()
const PORT = 8080 
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"src/public/img")
    },
    filename:(req,file,cb)=>{
        cb(null, `${file.originalname}`)
    }
})

const upload = multer({storage:storage})
//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.post("/upload",upload.single("product"),(req,res)=>{
    console.log(req.body);
    res.send("Imagen cargada")
})

//Routes
app.use("/api/products", routerProduct)
app.use("/static", express.static(__dirname + "/public"))


app.listen(PORT,()=>{
    console.log(`Sever on port ${PORT}`);
})
