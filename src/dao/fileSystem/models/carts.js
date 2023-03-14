import ProductManager from '../controllers/productManager.js';
import { InvalidParams } from '../../../utils/error.js';
import Product from './product.js';

export default class Carts {
  static lastId = 0;
  id;
  products;
  constructor ({ id = null, products = []} = {}) {
    this.id = id && id >= 0 ? id : ++Product.lastId;
    if(this.id > Product.lastId) Product.lastId = this.id;
    this.Products = products;
  }

  /**
   * Método setter encargado de validar y setear los productos
   */
  set Products (value = []) {
    if (!Array.isArray(value)) throw new InvalidParams('Los productos recibidos son invalidos');
    this.products = value;
  }

  /**
   * Método geter encargado de retornar un array de productos
   */
  get Products () {
    return this.products;
  }

  /**
   * Método geter encargado de retornar el id del carrito
   */
  get Id () {
    return this.id;
  }

  /**
   * Método encargado de agregar un id al array de productos
   * @param {*} pid
   */
  async addProduct ({ pid, quantity = 1}) {
    // busca el producto en el listado actualizar
    const product = this.Products.find(({ product }) => product === pid);
    if (product) {
      product.quantity += quantity;
      return;
    }
    // Valida que exista el producto
    const { id } = await (new ProductManager().getProductsById(pid));
    this.products.push({ product: id , quantity: quantity });
  }
}
