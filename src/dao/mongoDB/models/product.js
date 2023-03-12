import mongoose, { Schema } from "mongoose";

const ProductModel = mongoose.model('Product', new Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: {
    type: [String],
    default: []
  },
  code: String,
  stock: Number
}));

export default class Product extends ProductModel {
  constructor (data) {
    super(data);
  }
}
