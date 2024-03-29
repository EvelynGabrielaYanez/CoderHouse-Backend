import Product from '../../dao/models/product.js';
import { USER_ROLES } from '../../utils/constants.js';
import { ERROR_DICTIONARY, InvalidParams, NotFound, Unauthorized } from "../../utils/error.js";
import { getUrlPage, translate } from '../../utils/string.js';

/**
 * Clase encargada de manejar el listado de productos
 */
export default class ProductManager {
  /**
   * Método encargado de instanciar y agregar un producto a la lista
   * @param {*} newProductData
   * @returns
   */
  async addProduct (newProductData = {}) {
    let newProduct = null;
    const products = await this.findAll();
    const noExist = products.every(product => newProductData.code !== product.code);
    if (!noExist) return newProduct;
    newProduct = new Product(newProductData);
    await Product.collection.insertOne(newProduct);
    return newProduct;
  }

  /**
   * Método encargado de retornar el listado de prodcutos con paginado
   * @returns Product[]
   */
  async getProducts ({page, limit, query, sort} = {}) {
    const { docs = [], ...rest } = await Product.paginate(query,{
      page: page || 1 ,
      limit: limit || 10,
      sort: sort || {}
    });
    return { payload: docs, ...rest };
  }

  /**
   * Método encargado de retornar el listado de prodcutos
   * @returns Product[]
   */
  async findAll () {
    return Product.find().exec();
  }

  /**
   * Método encargado de actualizar un producto
   * @param {*} param0
   */
  async updateProduct ({ id, title, description, price, thumbnail, code, stock, owner, role } = {}) {
    const productToUpdate = await this.getProductsById(id);
    if (!productToUpdate) throw new NotFound (translate(ERROR_DICTIONARY.INVALID_PRODUCT_ID, id));
    if (role === USER_ROLES.PREMIUM && String(owner) !== productToUpdate.owner) throw new Unauthorized(translate(ERROR_DICTIONARY.NO_USER_PRODUCTS, owner, id));
    productToUpdate.title = title ?? productToUpdate.Title;
    productToUpdate.description = description ?? productToUpdate.Description;
    productToUpdate.price = price ?? productToUpdate.Price;
    productToUpdate.thumbnail = thumbnail ?? productToUpdate.Thumbnail;
    productToUpdate.code = code ?? productToUpdate.Code;
    productToUpdate.stock = stock ?? productToUpdate.Stock;
    await Product.updateOne({ _id: id }, productToUpdate).exec();
    return productToUpdate;
  }

  /**
   * Método encargvado de eliminar
   * @param {*} productId
   * @returns
   */
  async deleteProduct (productId, { role, owner } = {}) {
    const filter = {_id: productId }
    if (role === USER_ROLES.PREMIUM) filter.owner = String(owner);
    const { deletedCount } = await Product.deleteOne(filter).exec();
    if (!deletedCount && role !== USER_ROLES.PREMIUM) throw new NotFound(translate(ERROR_DICTIONARY.INVALID_PRODUCT_ID, productId));
    else if (!deletedCount)  throw new Unauthorized(translate(ERROR_DICTIONARY.NO_USER_PRODUCTS, owner, productId));
    return deletedCount;
  }

  /**
   * Método encargado de obtener un producto por id
   * @param {*} id
   * @returns
   */
  async getProductsById (id) {
    const product = await Product.findById(id).exec()
    if (!product) throw new NotFound(translate(ERROR_DICTIONARY.INVALID_PRODUCT_ID, id));
    return product;
  }

  calculateNextPrevPage (req, nextPage, prevPage) {
    const httpStrig = `${req.protocol}://${req.get('host') }${req.originalUrl}${req.originalUrl.includes('?') ? '' : '?'}${req.originalUrl.includes('page') ? '' : 'page=1'}`;
    return {
      nextLink: nextPage ? getUrlPage(nextPage, httpStrig) : '',
      prevLink: prevPage ? getUrlPage(prevPage, httpStrig) : ''
    }
  }
  static calculatePaginationLink (req, from, to) {
    const httpStrig = `${req.protocol}://${req.get('host') }${req.originalUrl}${req.originalUrl.includes('?') ? '' : '?'}${req.originalUrl.includes('page') ? '' : 'page=1'}`;
    const pagination = [];
    for(let pageNumber = from; pageNumber <= to; pageNumber++) {
      pagination.push({
        pageNumber,
        link: getUrlPage(pageNumber, httpStrig)
      })
    }
    return pagination;
  }
}