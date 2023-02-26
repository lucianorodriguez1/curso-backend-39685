

const socket = io() 

const form = document.getElementById("form")
const addProductInContainer = document.getElementById("add-product-in-container");



form.addEventListener("submit", (e)=>{

    e.preventDefault()

   const title = document.getElementById("title-addproduct").value;
   const thumbnail = document.getElementById("img-addproduct");
   const description = document.getElementById("description-addproduct").value;
   const price = document.getElementById("price-addproduct").value;
   const stock = document.getElementById("stock-addproduct").value;
   const category = document.getElementById("category-addproduct").value;
   const code = document.getElementById("code-addproduct").value;
//    const status = document.getElementById("status-addproduct").value;

   const product={title, thumbnail, description,price,stock,category,code}
   socket.emit("addProduct-socket", product)
})


socket.on("mensajeproductoadd",mensaje=>{
    console.log(mensaje)
})
//agrego los productos a la lista 
socket.on("getProducts-socket", products=>{

    addProductInContainer.innerHTML=""
 
    products.forEach(product=>{
        addProductInContainer.innerHTML +=
        `
        <div class="card-home">
            <img src="img/1050ti.jfif">
            <h5>${product.title}</h5>
            <p>ID:${product.id}</p>
            <p>Description: ${product.description}</p>
            <p>Precio: ${product.price}</p>     
            <p>Stock: ${product.stock}</p>
            <p>Code: ${product.code}</p>
            <p>Category: ${product.category}</p>
            <p>Status: ${product.status}</p>
            <button type="submit" id="button-delete-product">Borrar</button>
        </div> 
        `

    })
})










// borrar el producto

