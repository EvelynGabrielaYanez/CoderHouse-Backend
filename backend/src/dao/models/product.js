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
const Product = mongoose.model('products', productSchema);

export default Product;