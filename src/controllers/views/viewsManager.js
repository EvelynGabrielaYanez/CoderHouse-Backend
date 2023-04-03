import CartsManager from "../carts/cartsManager.js";
import ProductManager from "../product/productManager.js";

export default class ViewManager {
  static home(req, res) {
    res.redirect(`${req.protocol}://${req.get('host') }/login`);
  }

  static login(req, res) {
    if (req.session.user)
      res.redirect(`${req.protocol}://${req.get('host') }/products`);
    else
      res.render('login', {
      style: './css/sessionStyles.css',
      title: "Iniciar sesión"
    });
  }

  static async products (req,res) {
    if(!req.session.user)
      return res.redirect(`${req.protocol}://${req.get('host') }/login`);
    const page = req.query?.page ? parseInt(req.query?.page) : 1;
    const productManager = new ProductManager();
    const {payload: products, ...paginateData} = (await productManager.getProducts({page}));
    const { nextLink, prevLink} = productManager.calculateNextPrevPage(req, paginateData.nextPage, paginateData.prevPage);
    res.render("products", {
      data: {
        columns: ['Titulo', 'Descripción', 'Precio', 'Código', 'Stock'],
        values: products.map(({_id,title, description, price, code, stock}) => { return {id: _id,title, description, price, code, stock}})
      },
      paginateData: {...paginateData, nextLink, prevLink, pagination: ProductManager.calculatePaginationLink(req, 1, paginateData.totalPages)},
      userData: {
        firstName: req.session.user.firstName,
        lastName: req.session.user.lastName
      }
    });
  }

  static createUser (req, res ) {
    if (req.session.user)
      res.redirect(`${req.protocol}://${req.get('host') }/products`);
    else
      res.render('create-user', {
        style: './css/sessionStyles.css',
        title: 'Crear Usuario'
      });
  }

  static async cart (req,res) {
    if(!req.session.user)
      return res.redirect(`${req.protocol}://${req.get('host') }/login`);
    const { cid } = req.params;
    const cartManager = new CartsManager();
    const products = (await cartManager.getCartsProducts(cid)).products;
    res.render("cart", {
      data: {
        columns: ['Titulo', 'Descripción', 'Precio', 'Código', 'Cantidad'],
        values: products.map(({product, quantity}) => {
          const { _id, title, description, price, code } = product;
          return {id: _id,title, description, price, code, quantity}
        })
      }
    });
  }
}

