export const getUrlPage = (page, url) =>  {
  const [path,params] = url.split('?')
  if(!params) return `${url}?page=${page}`;
  const newParams = params.split('&').map(paramStr => {
    let [param, value] = paramStr.split('=');
    if(param === 'page') value = page;
    return `${param}=${value}`;
  }).join('&')
 return `${path}?${newParams}`;
}

export function translate(value, ...args) {
  args.forEach((arg, index) => {
    value = value.replace(`{${index}}`, arg)
  });
  return value;
}
