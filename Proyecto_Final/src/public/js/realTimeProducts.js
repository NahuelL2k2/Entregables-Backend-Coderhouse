const socketClient = io()

socketClient.on("sendProducts", (productList) => {
    updateProductList(productList)
})

socketClient.on("deleteProduct", (productList) => {
    updateProductList(productList)
})

function updateProductList(list) {
    const div = document.getElementById("listDiv")

    let productList = list
    let products = ""
    div.innerHTML = ""

    productList.forEach(product => {
        products += `<div id="${product.id}">
                    <div>
                        <img src="${product.thumbnail}" alt="">
                        <h2>Titulo del producto: ${product.title}</h2>
                    </div>
                    <div>
                        <p>Categoria del producto:${product.category}</p>
                        <p>Descripción: ${product.description}</p>
                        <p>Precio: $${product.price}</p>
                        <p>Código: ${product.code}</p>
                        <p>Stock: ${product.stock}</p>
                    </div>
                </div>`

    });
    div.innerHTML = products
}



const form = document.getElementById("formRTP")
form.addEventListener("submit", (event) => {
    event.preventDefault()

    let title = form.elements.title.value
    let category = form.elements.category.value
    let description = form.elements.description.value
    let stock = form.elements.stock.value
    let price = form.elements.price.value
    let code = form.elements.code.value
    let thumbnail = form.elements.thumbnail.value

    socketClient.emit("addProduct", {
        title,
        category,
        description,
        thumbnail,
        stock,
        price,
        code,
    });
    Swal.fire({
        title: "Tarea Realizada",
        text: "Producto añadido",
        icon: "success"
    })
    form.reset()
})

document.getElementById("delete-btn").addEventListener("click", (event) => {
    const deleteIdInput = document.getElementById("pid");
    const deleteId = parseInt(deleteIdInput.value);
    socketClient.emit("deleteProduct", deleteId);
    deleteIdInput.value = "";
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Producto eliminado",
        showConfirmButton: false,
        timer: 1000,
      });
});