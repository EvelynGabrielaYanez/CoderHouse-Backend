import { request } from "../../utils/request";

export const getProducts = async (page = 1, limit = 12) => {
  const productsData = await request({ path: `api/products?page=${page}&limit=${limit}`, method: 'GET'});
  if(productsData.status && productsData.status !== 200) return null;
  const { payload, ...paginateData } = productsData;
  return { payload, paginateData };
}