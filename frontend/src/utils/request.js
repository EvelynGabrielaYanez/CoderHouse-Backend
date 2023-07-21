import { URL } from "./constants"
import { getCookie } from "./cookies";

export const request = async({ auth = true, path, method, body}) => {
    const requestParams = {
      method,
      credentials: 'include',
      header: {
        'Authorization': `bearer ${getCookie('jwt')}`,
        'Content-type': 'application/json'
      }
    }
    if (body) requestParams.body = JSON.stringify(body);
    console.log(requestParams, `${URL}/${path}`)
    //if (auth) requestParams.header.Authorization = `bearer ${getCookie('jwt')}`;
    console.log()
    const response = await fetch(`${URL}/${path}`, requestParams);
    if (response.status !== 200) return { status: response.status};
    return response.json();
}