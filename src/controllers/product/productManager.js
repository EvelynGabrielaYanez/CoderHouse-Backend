import Product from '../../models/product.js';
import { promises as fs } from 'fs';
import { InvalidParams, NotFound } from '../../utils/error.js';
import { __dirname } from '../../app.js';

/**
 * Clase encargada de manejar el listado de productos
 */
export default class ProductManager {
  path;
  static prodctManagerInstance;
  constructor (path = 'productos.json') {
    this.Path = path;
  }

  /**
   * Se setea el path del archivo junto con el nombre del producto
   */
  set Path (value) {
    if (!value || typeof value !== 'string') throw new InvalidParams ('Parametro path es invalido');
    this.path = `${__dirname}\\..\\${value}`;
  }

  /**
   * Método encargado de instanciar y agregar un producto a la lista
   * @param {*} newProductData
   * @returns
   */
  async addProduct (newProductData = {}) {
    let newProduct = null;
    const products = await this.getProducts();
    const noExist = products.every(product => newProductData.code !== product.Code);
    if (!noExist) return newProduct;
    newProduct = new Product(newProductData);
    products.push(newProduct);
    this.writeProductsFile(products);
    return newProduct;
  }

  /**
   * Escribir los productos en el archivo
   * @param {*} products
   */
  async writeProductsFile(products) {
    await fs.writeFile(this.path, JSON.stringify(products), 'utf-8');
  }

  /**
   * Método encargado de retornar el listado de prodcutos
   * @returns Product[]
   */
  async getProducts (limit) {
    const exist = await fs.stat(this.path).catch(error => {
      // Valido si no existe el archivo
      if(error.code !== 'ENOENT') throw new Error(`Ocurrio un error al leer el achivo ${this.path}`);
      return false;
    });
    const result = exist ?  JSON.parse((await fs.readFile(this.path, 'utf8')) || '[]') : [];
    const response = result.map(productData => { return new Product(productData)});
    return response.slice(0, limit || response.length);
  }

  /**
   * Método encargado de actualizar un producto
   * @param {*} param0
   */
  async updateProduct ({ id, title, description, price, thumbnail, code, stock }) {
    const products = await this.getProducts();
    const productToUpdate = products.find(product => product.id === id);
    if (!productToUpdate) throw new NotFound ('El id de producto no se encuentra registrado para actualizar');
    productToUpdate.Title = title ?? productToUpdate.Title;
    productToUpdate.Description = description ?? productToUpdate.Description;
    productToUpdate.Price = price ?? productToUpdate.Price;
    productToUpdate.Thumbnail = thumbnail ?? productToUpdate.Thumbnail;
    productToUpdate.Code = code ?? productToUpdate.Code;
    productToUpdate.Stock = stock ?? productToUpdate.Stock;
    // Actualizo el archivo de productos
    this.writeProductsFile(products);
  }

  /**
   * Método encargvado de eliminar
   * @param {*} productId
   * @returns
   */
  async deleteProduct (productId) {
    const products = await this.getProducts()
    const newproducts = products.filter(product => product.Id !== productId);
    if (products.length ===  newproducts.length) throw new NotFound('El id ingresado no corresponde a un producto que se encuentre registrado');
    // Actualizo el archivo de productos
    this.writeProductsFile(newproducts);
  }

  /**
   * Método encargado de obtener un producto por id
   * @param {*} id
   * @returns
   */
  async getProductsById (id) {
    const product = (await this.getProducts()).find(product => product.Id === id);
    if (!product) throw new NotFound('El id ingresado no corresponde a un id que se encuentre registrado');
    return product;
  }
}