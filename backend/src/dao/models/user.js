import mongoose, { Schema } from "mongoose";
import { USER_ROLES } from "../../utils/constants.js";

const userSchema = new Schema({
  firstName: {
      type: String,
      required: true
  },
  lastName: {
      type: String,
      required: true
  },
  email: {
      type: String,
      unique: true,
      index: true
  },
  age: {
      type: Number,
      required: true
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts',
    require: true
  },
  role: {
      type: String,
      default: USER_ROLES.USER
  },
  password: {
      type: String,
      required: true
  }
});

userSchema.pre('find', function() {
  this.populate('cart');
});

const User = mongoose.model('user', userSchema);

export default User;