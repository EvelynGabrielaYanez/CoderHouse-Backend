async function addCartProduct(event) {
  const productID = event.target.parentNode.parentNode.id;
  const newList = await fetch(`${window.location.origin}/api/carts/641688c2496d77c3b41a2764/product/${productID}`, { method: 'POST' });
}

async function deleteCartProduct(event) {
  const productID = event.target.parentNode.parentNode.id;
  const newList = await fetch(`${window.location.origin}/api/carts/641688c2496d77c3b41a2764/product/${productID}`, { method: 'DELETE' });
}

const addAllDeleteEvent = () => {
  const test = document.getElementsByClassName("deleteProduct");
  Array.prototype.forEach.call(test, addDeleteEvent);
};
const addDeleteEvent = deleteButton => {
  deleteButton.addEventListener("click", deleteProduct);
};
const addAllAddEvent = () => {
  const test = document.getElementsByClassName("addProduct");
  Array.prototype.forEach.call(test, addAddEvent);
};
const addAddEvent = deleteButton => {
  deleteButton.addEventListener("click", addProduct);
};
addAllDeleteEvent();
addAllAddEvent();


async function nextPage (page) {
  await fetch(page);
};