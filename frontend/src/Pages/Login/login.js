import { URL } from '../../utils/constants';
export const login = async ({ email, password }) => {
  const loginResponse = await fetch(`${URL}/api/session/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  const errorMessage = {
    '500': 'Error de conexión',
    '400': 'Parametros invalidos',
    '401': 'Usuario o contraseña incorrectos',
    'default': 'Error inesperado en el servidor'
  };
  const message = loginResponse.status !== 200 ? (errorMessage[loginResponse.status] ?? errorMessage.default) : '';
  if (message.length) throw new Error(message);
  const response =  await loginResponse.json();
  console.log(response)
  return response;
}