const temporalCartId = '6418edc473e5b0b8f080a4c4';

async function addCartProduct(event) {
  const productID = event.target.parentNode.parentNode.id;
  await fetch(`${window.location.origin}/api/carts/${temporalCartId}/product/${productID}`, { method: 'POST' });
}

async function deleteCartProduct(event) {
  const productID = event.target.parentNode.parentNode.id;
  await fetch(`${window.location.origin}/api/carts/${temporalCartId}/product/${productID}`, { method: 'DELETE' });
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