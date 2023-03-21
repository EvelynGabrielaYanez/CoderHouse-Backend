import { Router } from 'express';
import CartsManager from '../controllers/carts/cartsManager.js';
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


viewsRouter.get("/cart/:cid", async (req,res) => {
  const { cid } = req.params;
  const cartManager = new CartsManager();
  const products = (await cartManager.getCartsProducts(cid)).products;
  console.log(products);
  res.render("cart", {
    data: {
      columns: ['Titulo', 'Descripción', 'Precio', 'Código', 'Cantidad'],
      values: products.map(({product, quantity}) => {
        const { _id, title, description, price, code } = product;
        return {id: _id,title, description, price, code, quantity}
      })
    }
  });
});

export default viewsRouter;
