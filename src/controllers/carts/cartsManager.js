
import { InvalidParams, NotFound } from "../../utils/error.js";
import Carts from "../../dao/models/carts.js";

export default class CartsManager {
  /**
   * Método encargado de obtener un carro por id
   * @param {int} id
   * @returns {}
   */
  async getCartById (id) {
    const cart = await Carts.findById(id).populate('products.product').exec();
    if (!cart) throw new NotFound('El id ingresado no corresponde a un id que se encuentre registrado');
    return cart;
  }

  /**
   * Método encargado de retornar el listado de carritos
   * @returns {}
   */
  async getCarts () {
    return Carts.find().exec();
  }

  /**
   * Método encargado de guardar el carro pasado por parametro
   * @param {{products: int[]}} newCartData
   * @returns {}
   */
  async save (newCartData) {
    const newCart = new Carts(newCartData);
    await Carts.collection.insertOne(newCart);
    return newCart;
  }

  async getCartsProducts (cid) {
    return await (new CartsManager().getCartById(cid));
  }

  /**
   * Método encargado de agregar un producto al carro pasado por id.
   * En caso de no existir el carro correspondiente al id
   * o el producto correspindiente al id se arrojara un error del tipo InvalidParams
   * @param {{ cid: int, pid: int }} param0
   */
  async addProduct({ cid, pid }) {
    const cart = await this.getCartById(cid);
    if (!cart) throw new InvalidParams(`El carrito de id ${cid} no existe`);
    await cart.addProduct({ pid });
    await cart.save();
    return cart;
  }

  /**
   * Método encargado de eliminar un producto del carrito
   * @param {*} param0
   * @returns
   */
  async deleteProduct({ cid, pid }) {
    const result = await Carts.updateOne({_id: cid}, {
      $pull: {
        products: { product: pid }
      }
    }).exec();
    return result;
  }

  async updateProductQty({ cid, pid , qty }) {
    const result = await Carts.updateOne({
      _id: cid,
      "products.product": pid,
    },
    {
      "$set": {
        "products.$.quantity": qty
      }
    }).exec();
    return result;
  }

  async updateProducts(cid, products) {
    const result = await Carts.updateOne({_id: cid}, {
      $set: {
        products: products
      }
    }).exec();
    return result;
  }

  async deleteProducts(cid) {
    const result = await Carts.updateOne({_id: cid}, {
      $set: {
        products: []
      }
    }).exec();
    return result;
  }

}