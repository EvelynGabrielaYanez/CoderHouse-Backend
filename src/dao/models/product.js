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
  status: Number
});
productSchema.plugin(paginate);
const Product = mongoose.model('products', productSchema);

export default Product;