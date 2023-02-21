let socket

if (window.location.pathname !== "/") {
     socket = io();
    /* Se recarga la lista de productos */
    socket.on("product/add", product => {
        addProduct(product);
    });

    /* Se recarga la lista de productos */
    socket.on("product/delete", newProductsList => {
        const productList = document.getElementById("products");
        while (productList.firstChild) {
            productList.removeChild(productList.firstChild);
        }
        newProductsList.forEach(product => addProduct(product));
    });
}

const btnAddProduct = document.getElementById("btnAddProduct");

/* Se emite el mensaje de producto neuvo */
btnAddProduct?.addEventListener("click", () => {
    const title = document.getElementById("titleForm")
    const description = document.getElementById("descriptionForm")
    const code = document.getElementById("codeForm")
    const price = document.getElementById("priceForm")
    const stock = document.getElementById("stockForm")
    const category = document.getElementById("categoryForm")
    const thumbnail = document.getElementById("imgForm");
    socket.emit("product/add", {
      title: title.value,
      description: description.value,
      code: code.value,
      price: price.value,
      stock: stock.value,
      category: category.value,
      thumbnail: Array.prototype.map.call(thumbnail.files, file=> file.name)
    });
    title.value = "";
    description.value = "";
    thumbnail.value = "";
    code.value = "";
    stock.value = "";
    category.value = "";
    price.value = "";
});

const addAllDeleteEvent = () => {
  const test = document.getElementsByClassName("deleteProduct");
  console.log(typeof test);
  Array.prototype.forEach.call(test, addDeleteEvent);
};
const addDeleteEvent = deleteButton => {
  deleteButton.addEventListener("click", event => {
    const productID = parseInt(event.target.getAttribute("productId"));
    socket.emit("product/delete", productID);
  });
};
addAllDeleteEvent();


const addProduct = product => {
    const ul = document.getElementById("products");
    ul.insertAdjacentHTML('beforeend',`
    <li>
      <div id="${product.id}" class="product">
        <div>
          <div class="productTitle">
            <p>Producto1 Actualizado</p>
          </div>
          ${product.thumbnail.length ? `<img src="img/${product.thumbnail}" alt="${product.description}">` : ""}
          <div class="productBottom">
            <p>Code: ${product.code}</p>
            <p>Descripcion: ${product.description}</p>
            <p>Precio: ${product.price}</p>
          </div>
        </div>
        <div>
          <button class="deleteProduct" productid="${product.id}">Eliminar</button>
        </div>
      </div>
    </li>
  `);
  const deleteButton = ul.querySelector(`[productid="${product.id}"]`);
  addDeleteEvent(deleteButton);
}
