import Carts from "../../models/carts.js";
import { InvalidParams, NotFound } from "../../utils/error.js";
import ProductManager from "../product/productManager.js";
import { __dirname } from '../../app.js';
import { promises as fs } from 'fs';

export default class CartsManager {
  path;
  static prodctManagerInstance;
  constructor (path = 'carts.json') {
    this.Path = path;
  }

  /**
   * Se setea el path del archivo junto con el nombre del producto
   */
  set Path (value) {
    if (!value || typeof value !== 'string') throw new InvalidParams ('Parametro path es invalido');
    this.path = `${__dirname}/../${value}`;
  }

  /**
   * Método encargado de obtener un carro por id
   * @param {int} id
   * @returns {}
   */
  async getCartById (id) {
    const cart = (await this.getCarts()).find(cart => cart.Id === id);
    console.log("carro", cart);
    if (!cart) throw new NotFound('El id ingresado no corresponde a un id que se encuentre registrado');
    return cart;
  }

  /**
   * Método encargado de retornar el listado de carritos
   * @returns {}
   */
  async getCarts () {
    const exist = await fs.stat(this.path).catch(error => {
      // Valido si no existe el archivo
      if(error.code !== 'ENOENT') throw new Error(`Ocurrio un error al leer el achivo ${this.path}`);
      return false;
    });
    const result = exist ?  JSON.parse((await fs.readFile(this.path, 'utf8')) || '[]') : [];
    return result.map(cartsData => new Carts(cartsData));
  }

  /**
   * Método encargado de guardar el carro pasado por parametro
   * @param {{ id: int, products: int[]}} newCartData
   * @returns {}
   */
  async save (newCartData) {
    const carts = await this.getCarts();
    const newCart = new Carts(newCartData);
    carts.push(newCart);
    this.writeCartsFile(carts);
    return newCart;
  }

  async writeCartsFile (carts) {
    await fs.writeFile(this.path, JSON.stringify(carts), 'utf-8');
  }

  async getCartsProducts (cid) {
    const { products } = await (new CartsManager().getCartById(cid));
    return products;
  }

  /**
   * Método encargado de agregar un producto al carro pasado por id.
   * En caso de no existir el carro correspondiente al id
   * o el producto correspindiente al id se arrojara un error del tipo InvalidParams
   * @param {{ cid: int, pid: int }} param0
   */
  async addProduct({ cid, pid }) {
    const carts = await this.getCarts();
    console.log(carts, pid);
    const cart = carts.find(cart => cart.id = cid);
    if (!cart) throw new InvalidParams(`El carrito de id ${cid} no existe`);
    console.log("pod", pid);
    await cart.addProduct({ pid });
    this.writeCartsFile(carts);
  }
}