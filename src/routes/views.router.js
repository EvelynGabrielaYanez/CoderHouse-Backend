import { Router } from 'express';
import ProductManager from '../controllers/product/productManager.js';

const viewsRouter = Router();

viewsRouter.get("/products", async (req,res) => {
  const page = req.query?.page ? parseInt(req.query?.page) : 1;
  const productManager = new ProductManager();
  const {payload: products, ...paginateData} = (await productManager.getProducts({page}));
  const { nextLink, prevLink} = productManager.calculateNextPrevPage(req, paginateData.nextPage, paginateData.prevPage);
  res.render("products", {
    data: {
      columns: ['Titulo', 'Descripción', 'Precio', 'Código', 'Stock'],
      values: products.map(({_id,title, description, price, code, stock}) => { return {id: _id,title, description, price, code, stock}})
    },
    paginateData: {...paginateData, nextLink, prevLink, pagination: ProductManager.calculatePaginationLink(req, 1, paginateData.totalPages)}
  });
});

export default viewsRouter;