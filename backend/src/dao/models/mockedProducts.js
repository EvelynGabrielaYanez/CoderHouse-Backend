import mongoose, { Schema } from "mongoose";
import paginate from 'mongoose-paginate-v2';

const mockedProductSchema = new Schema({
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
mockedProductSchema.plugin(paginate);
const MockedProductsModel = mongoose.model('mockedProducts', mockedProductSchema);

export default  class MockedProducts extends MockedProductsModel {
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