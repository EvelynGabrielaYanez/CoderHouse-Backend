import mongoose, { Schema } from "mongoose";
import paginate from 'mongoose-paginate-v2';

const productSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: {
    type: [String],
    default: []
  },
  code: String,
  stock: Number,
  status: {
    type: Number,
    default: 1
  },
  category: String
});
productSchema.plugin(paginate);
const ProductModel = mongoose.model('products', productSchema);

export default  class Product extends ProductModel {
  constructor (data) {
    super(data);
  }
  /**
   * Método encargado de agregar un id al array de productos
   * @param {*} pid
   */
  async removeProducts (quantity) {
    if(this.stock < quantity) return { error: 'La cantidad es insuficiente'};
    this.stock -= quantity;
    this.save();
  }
}