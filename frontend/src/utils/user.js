import { URL } from "./constants";

export const findCurrentUser = async({ token }) => {
  try {
    console.log("jwt",token)
    const loginResponse = await fetch(`${URL}/api/session/current`, {
      method: 'GET',
      headers: {
        'Authorization': 'bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
    const errorMessage = {
      '500': 'Error de conexión',
      '400': 'Parametros invalidos',
      '401': 'Usuario o contraseña incorrectos',
      'default': 'Error inesperado en el servidor'
    };
    const message = loginResponse.status !== 200 ? (errorMessage[loginResponse.status] ?? errorMessage.default) : '';
    if (message.length) throw new Error(message);
    return loginResponse.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}