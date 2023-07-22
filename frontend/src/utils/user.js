import { URL } from "./constants";
import { getCookie } from "./cookies";
import { request } from "./request";

export const findCurrentUser = async() => {
  try {
    const loginResponse = await request({ path: 'api/session/current', method: 'GET' });
    const errorMessage = {
      '500': 'Error de conexión',
      '400': 'Parametros invalidos',
      '401': 'Usuario o contraseña incorrectos',
      'default': 'Error inesperado en el servidor'
    };
    const message = loginResponse.status && loginResponse.status !== 200 ? (errorMessage[loginResponse.status] ?? errorMessage.default) : '';
    if (message.length) throw new Error(message);
    return loginResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
}