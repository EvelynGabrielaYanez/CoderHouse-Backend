
import { ERROR_DICTIONARY, InvalidParams, NotFound } from "../../utils/error.js";
import Carts from "../../dao/models/carts.js";
import Product from "../../dao/models/product.js";
import TicketManager from "../ticket/ticketManager.js";
import { translate } from "../../utils/string.js";
import { USER_ROLES } from "../../utils/constants.js";

export default class CartsManager {
  /**
   * Método encargado de obtener un carro por id
   * @param {int} id
   * @returns {}
   */
  async getCartById (id) {
    const cart = await Carts.findById(id).populate('products.product').exec();
    if (!cart) throw new NotFound(translate(ERROR_DICTIONARY.INVALID_USER_ID, id));
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
  async addProduct({ cid, pid, ownerId, ownerRole }) {
    const cart = await this.getCartById(cid);
    if (!cart) throw new InvalidParams(translate(ERROR_DICTIONARY.CART_DOESNT_EXIT, cid));
    const productToAdd = await Product.findById(pid);
    if (!productToAdd) throw new InvalidParams(translate(ERROR_DICTIONARY.INVALID_PRODUCT, pid));
    if (ownerRole === USER_ROLES.PREMIUM && String(ownerId) === productToAdd.owner) throw new InvalidParams(translate(ERROR_DICTIONARY.PRODUCT_OWNER_CART_ADD, ownerId, pid));
    await cart.addProduct({ pid });
    return cart.save().then(t => t.populate('products.product'));
  }

  /**
   * Método encargado de eliminar un producto del carrito
   * @param {*} param0
   * @returns
   */
  async deleteProduct({ cid, pid }) {
    const result = await Carts.findByIdAndUpdate({_id: cid}, {
      $pull: {
        products: { product: pid }
      }
    }, { new: true }).exec();
    return result;
  }

  async updateProductQty({ cid, pid , qty }) {
    const result = await Carts.findOneAndUpdate({
      _id: cid,
      "products.product": pid,
    },
    {
      "$set": {
        "products.$.quantity": qty
      }
    }, { new: true }).exec();
    if (!result) throw new InvalidParams(translate(ERROR_DICTIONARY.INVALID_CART_OR_PRODUCT, cid, pid));
    return result;
  }

  async updateProducts(cid, products) {
    const result = await Carts.findByIdAndUpdate(cid, {
      $set: {
        products: products
      }
    }, { new: true }).exec();
    if  (!result) throw new InvalidParams(translate(ERROR_DICTIONARY.INVALID_CART, cid));
    return result;
  }

  async deleteProducts(cid) {
    const result = await Carts.findByIdAndUpdate(cid, {
      $set: {
        products: []
      }
    }, { new: true } ).exec();
    if (!result) throw new InvalidParams(translate(ERROR_DICTIONARY.INVALID_CART, cid));
    return result;
  }

  async deleteProductsList (productList, cid) {
    const productIdList = productList.map(({ product }) => product._id);
    return Carts.findOneAndUpdate({_id: cid}, {
      "$pull": {
        "products": { "product": { $in: productIdList} }
    }}, { new: true } ).exec();
  }

  async getProductsStockDetail (products) {
    return products.reduce(async ( accum ,{ product, quantity}) => {
      const { productsWithoutStock, productsWithSock } = await accum;
      const instanceProduct = new Product(product);
      const { error } = await instanceProduct.removeProducts(quantity) ?? {};
      if(error) productsWithoutStock.push(instanceProduct._id);
      else productsWithSock.push({ product: instanceProduct, quantity });
      return { productsWithoutStock, productsWithSock };
    }, Promise.resolve({ productsWithoutStock: [], productsWithSock: []}))
  }

  async purchase (cid, purchaser) {
    const cart = await this.getCartById(cid);
    if (!cart) throw new NotFound(translate(ERROR_DICTIONARY.INVALID_CART, cid));
    const { productsWithoutStock, productsWithSock } = await this.getProductsStockDetail(cart.products);
    const ticket = await TicketManager.create(productsWithSock, purchaser);
    console.log(productsWithSock)
    console.log(await this.deleteProductsList(productsWithSock, cid));
    return { ticket, productsWithoutStock }
  }
}
