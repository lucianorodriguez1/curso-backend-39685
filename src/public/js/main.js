const socket = io() 

const form = document.getElementById("form")

form.addEventListener("submit", ()=>{

   const title = document.getElementById("title-addproduct").value;
   const image = document.getElementById("img-addproduct").value;
   const description = document.getElementById("description-addproduct").value;
   const price = document.getElementById("price-addproduct").value;
   const stock = document.getElementById("stock-addproduct").value;
   const category = document.getElementById("category-addproduct").value;
   const code = document.getElementById("code-addproduct").value;
   const status = document.getElementById("status-addproduct").value;

   socket.emit("addProduct-socket",{title, image, description,price,stock,category,code, status})
})








//agrego los productos a la lista 
socket.on("getProducts-socket", products=>{

    const addProductInContainer = document.getElementById("add-product-in-conatiner");

    products.forEach(product=>{
        addProductInContainer.innerHTML +=
        `
        <div class="card-home">
            <img src="${product.thumbnail}">
            <h5>${product.title}</h5>
            <p id="id-product">ID: ${product.id}</p>
            <p>Description: ${product.description}</p>
            <p>Precio: ${product.price}</p>     
            <p>Stock: ${product.stock}</p>
            <p>Code: ${product.code}</p>
            <p>Status:true</p>
            <button type="submit" id="button-delete-product">Borrar</button>
        </div> 
        `

    })
})










// borrar el producto

