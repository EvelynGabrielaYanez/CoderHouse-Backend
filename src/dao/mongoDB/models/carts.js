import mongoose, { Schema } from "mongoose";
import ProductManager from '../controllers/productManager.js';

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
    const product = this.products.find((element) => {
      console.log(element);
      return element.product === pid});
    if (product)
      product.quantity += quantity;
    else if (this.products.length){
      this.products.push({ product: pid , quantity: quantity });
    } else {
      this.products = [{ product: pid , quantity: quantity }];
    }
    console.log(this.products.length);


    // Valida que exista el producto
    //let result = await this.updateOne({ _id: this.id, 'product._id': pid }, { $set: { 'product.quantity': quantity + }}).exec();
   // await this.updateOne({ _id: this.id }, { $push: { product: id , quantity: quantity }}).exec();
    //const result = await this.updateOne({ _id: this.id }, { $push: { product: id , quantity: quantity }}).exec();
    //console.log(result);
  }
}