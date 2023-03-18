import Product from '../../dao/models/product.js';
import { NotFound } from "../../utils/error.js";

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
    const products = await this.getProducts().payload;
    const noExist = products.every(product => newProductData.code !== product.code);
    if (!noExist) return newProduct;
    newProduct = new Product(newProductData);
    await Product.collection.insertOne(newProduct);
    return newProduct;
  }

  /**
   * Método encargado de retornar el listado de prodcutos
   * @returns Product[]
   */
  async getProducts ({page, limit, query, sort}) {
    const { docs = [], ...rest } = await Product.paginate(query,{
      page: page || 1 ,
      limit: limit || 10,
      sort: sort || {}
    });
    return { payload: docs, ...rest };
  }

  /**
   * Método encargado de actualizar un producto
   * @param {*} param0
   */
  async updateProduct ({ id, title, description, price, thumbnail, code, stock }) {
    const productToUpdate = await this.getProductsById(id);
    if (!productToUpdate) throw new NotFound ('El id de producto no se encuentra registrado para actualizar');
    productToUpdate.title = title ?? productToUpdate.Title;
    productToUpdate.description = description ?? productToUpdate.Description;
    productToUpdate.price = price ?? productToUpdate.Price;
    productToUpdate.thumbnail = thumbnail ?? productToUpdate.Thumbnail;
    productToUpdate.code = code ?? productToUpdate.Code;
    productToUpdate.stock = stock ?? productToUpdate.Stock;
    await Product.updateOne({_id: id}, productToUpdate).exec();
    return productToUpdate;
  }

  /**
   * Método encargvado de eliminar
   * @param {*} productId
   * @returns
   */
  async deleteProduct (productId) {
    const { deletedCount } = await Product.deleteOne({_id: productId }).exec();
    if (!deletedCount) throw new NotFound('El id ingresado no corresponde a un producto que se encuentre registrado');
    return deletedCount;
  }

  /**
   * Método encargado de obtener un producto por id
   * @param {*} id
   * @returns
   */
  async getProductsById (id) {
    const product = await Product.findById(id).exec()
    if (!product) throw new NotFound('El id ingresado no corresponde a un id que se encuentre registrado');
    return product;
  }
}