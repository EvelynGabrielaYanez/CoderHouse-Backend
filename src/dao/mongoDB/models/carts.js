import mongoose, { Schema } from "mongoose";

const CartsModel = mongoose.model('Carts', new Schema({
  products: {
    type: [{product: String, quantity:Number}],
    default: []
  },
}));

export default  class Carts extends CartsModel {
  constructor (data) {
    super(data);
  }
  /**
   * Método encargado de agregar un id al array de productos
   * @param {*} pid
   */
  async addProduct ({ pid, quantity = 1}) {
    // busca el producto en el listado actualizar
    const product = this.products.find(({product}) => product === pid);
    if (product)
      product.quantity += quantity;
    else if (this.products.length){
      this.products.push({ product: pid , quantity: quantity });
    } else {
      this.products = [{ product: pid , quantity: quantity }];
    }
  }
}