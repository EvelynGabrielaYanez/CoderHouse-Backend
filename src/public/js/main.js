let CART_ID = null;

function setCartId (value) {
  CART_ID = value ?? null;
}

async function getCartId() {
  if (CART_ID) return CART_ID;
  const response = await fetch(`${window.location.origin}/api/session/current`);
  const user = await response.json();
  setCartId(user.cart._id);
  return CART_ID;
}

// Agrega eventos
const addAllDeleteEvent = () => {
  const test = document.getElementsByClassName("deleteProduct");
  Array.prototype.forEach.call(test, addDeleteEvent);
};
const addDeleteEvent = deleteButton => {
  deleteButton.addEventListener("click", deleteCartProduct);
};
const addAllAddEvent = () => {
  const test = document.getElementsByClassName("addProduct");
  Array.prototype.forEach.call(test, addAddEvent);
};
const addAddEvent = deleteButton => {
  deleteButton.addEventListener("click", addCartProduct);
};

/**
 * Agregar productos al carro
 * @param {*} event
 */
async function addCartProduct(event) {
  const productID = event.target.parentNode.parentNode.id;
  const response = await fetch(`${window.location.origin}/api/carts/${await getCartId()}/product/${productID}`, { method: 'POST' });
  const message = !response.ok || response.status !== 200 ? 'Ocurrio un error al intentar eliminar' : 'Producto agregado al carrito con èxito';
  alert(message);
}

/**
 * Eliminar productos del carro
 * @param {*} event
 */
async function deleteCartProduct(event) {
  const productID = event.target.parentNode.parentNode.id;
  let response = await fetch(`${window.location.origin}/api/carts/${await getCartId()}/product/${productID}`, { method: 'DELETE' });
  const message = !response.ok || response.status !== 200 ? 'Ocurrio un error al intentar eliminar' : 'Producto eliminado del carrito con èxito';
  alert(message);
}

addAllDeleteEvent();
addAllAddEvent();

// Busqueda de paginado
async function nextPage (page) {
  await fetch(page);
}

// Login
async function login(e) {
  e.preventDefault();
  const emailInput = document.getElementById('inputEmail');
  const passwordInput = document.getElementById('inputPassword');
  const response = await fetch(`${window.location.origin}/api/session/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: emailInput.value,
      password: passwordInput.value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok || response.status !== 200) alert('Usuario o contraseña invalidos');
  else  window.location.assign(`${window.location.origin}/products`);
  const { userData } = await response.json();
  setCartId(userData.cartId);
  return false;
}

async function goToCart() {
  window.location.assign(`${window.location.origin}/cart/${await getCartId()}`);
}

function goToProduct() {
  window.location.assign(`${window.location.origin}/products`);
}

async function logOut() {
  await fetch(`${window.location.origin}/api/session/logout`);
  setCartId(null);
  window.location.assign(`${window.location.origin}/login`);
}

async function createUser(e) {
  e.preventDefault();
  const firstNameElement = document.getElementById('inputName');
  const lastNameElement = document.getElementById('inputLastName');
  const emailElement = document.getElementById('inputEmail');
  const ageElement = document.getElementById('inputAge');
  const passwordElement = document.getElementById('inputPassword');
  const response = await fetch(`${window.location.origin}/api/user`, {
    method: 'POST',
    body: JSON.stringify({
      firstName: firstNameElement.value,
      lastName: lastNameElement.value,
      email: emailElement.value,
      age: parseInt(ageElement.value),
      password: passwordElement.value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if(response.status === 404) alert('El usuario ya existe');
  else if (!response.ok || response.status !== 200) alert('Datos invalidos');
  else  window.location.assign(`${window.location.origin}/login`);
  return false;
}

async function gitHubSession () {
  window.location.assign(`http://localhost:8080/authSession/github`);
}