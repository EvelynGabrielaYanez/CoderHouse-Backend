export const getCookie = (name) => {
  return document.cookie.split("; ").find((row) => row.startsWith("jwt="))?.split("=")[1];
}
export const setCookie = (name, value) => {
  document.cookie = `${name}=${value};expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`;
}