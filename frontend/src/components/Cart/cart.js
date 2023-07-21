import { request } from '../../utils/request';

export const getCartProducts = async({ cid }) => {
  console.log(cid)
  const cartResponse = await request({ path: `api/carts/${cid}`, method: 'GET' });
  const errorMessage = {
    '500': 'Error de conexión',
    '400': 'Parametros invalidos',
    '401': 'Datos invalidos',
    'default': 'Error inesperado en el servidor'
  };
  console.log(cartResponse);
  const message = cartResponse.status && cartResponse.status !== 200 ? (errorMessage[cartResponse.status] ?? errorMessage.default) : '';
  if (message.length) throw new Error(message);

  return { id: cartResponse._id, products: cartResponse.products };
}

export const addCartProduct = async({ cid, pid }) => {
  const response = await request({ path: `api/carts/${cid}/product/${pid}`, method: 'POST' });
  const errorMessage = {
    '500': 'Error de conexión',
    '400': 'Parametros invalidos',
    '401': 'No autorizado',
    'default': 'Error inesperado en el servidor'
  };
  const message = response.status && response.status !== 200 ? (errorMessage[response.status] ?? errorMessage.default) : '';
  if (message.length) throw new Error(message);
  return { products: response.products };
}

export const deleteCartProduct = async({ cid, pid }) => {
  const response = await request({ path: `api/carts/${cid}/product/${pid}`, method: 'DELETE' });
  const errorMessage = {
    '500': 'Error de conexión',
    '400': 'Parametros invalidos',
    '401': 'No autorizado',
    'default': 'Error inesperado en el servidor'
  };
  const message = response.status && response.status !== 200 ? (errorMessage[response.status] ?? errorMessage.default) : '';
  if (message.length) throw new Error(message);
  return { products: response.products };
}

export const deleteCartAllProducts = async({ cid }) => {
  const response = await request({ path: `api/carts/${cid}`, method: 'DELETE' });
  const errorMessage = {
    '500': 'Error de conexión',
    '400': 'Parametros invalidos',
    '401': 'No autorizado',
    'default': 'Error inesperado en el servidor'
  };
  const message = response.status && response.status !== 200 ? (errorMessage[response.status] ?? errorMessage.default) : '';
  if (message.length) throw new Error(message);
  return { products: response.products };
}

export const updateCartProductQty = async({ cid, pid, qty }) => {
  const response = await request({ path: `api/carts/${cid}`, method: 'DELETE', body: { product: pid, quantity: qty } });
  const errorMessage = {
    '500': 'Error de conexión',
    '400': 'Parametros invalidos',
    '401': 'No autorizado',
    'default': 'Error inesperado en el servidor'
  };
  const message = response.status && response.status !== 200 ? (errorMessage[response.status] ?? errorMessage.default) : '';
  if (message.length) throw new Error(message);
  return { products: response.products };
}