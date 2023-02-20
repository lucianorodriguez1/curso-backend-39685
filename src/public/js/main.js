const socket = io() 


//agregar el nuevo producto al listado
const buttonAddProduct = document.getElementById("button-add-product");

buttonAddProduct.addEventListener("submit",(e)=>{
    
    e.preventDefault();

    const title = document.getElementById("title-addproduct").value;
    const img = document.getElementById("img-addproduct").value;
    const description = document.getElementById("description-addproduct").value;
    const price = document.getElementById("price-addproduct").value;
    const stock = document.getElementById("stock-addproduct").value;
    const category = document.getElementById("category-addproduct").value;
    const code = document.getElementById("code-addproduct").value;

    const newProduct={title, img, description, price, stock, category, code}

    socket.emit("addProduct-socket", newProduct)
})






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
const buttonDeleteProduct = document.getElementById("button-delete-product")

buttonDeleteProduct.addEventListener("submit", (e)=>{
    e.preventDefault();
    const id = document.getElementById("id-product")
    socket.emit("deleteProduct-socket", id)
})