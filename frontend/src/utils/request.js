import { URL } from "./constants"
import { getCookie } from "./cookies";

export const request = async({ auth = true, path, method, body }) => {
    const requestParams = {
      method,
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      }
    }
    if (body) requestParams.body = JSON.stringify(body);
    if (auth) requestParams.headers.Authorization = `bearer ${getCookie('jwt')}`;
    const response = await fetch(`${URL}/${path}`, requestParams);
    if (response.status !== 200) return { status: response.status};
    return response.json();
}