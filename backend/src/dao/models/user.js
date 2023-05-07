import mongoose, { Schema } from "mongoose";

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
      default: "User"
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