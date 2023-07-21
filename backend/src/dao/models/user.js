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
  },
  documents: {
    type: [{
      name: String,
      reference: String
    }],
    default: []
  },
  last_connection: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('find', function() {
  this.populate('cart');
});

const UserModel = mongoose.model('user', userSchema);

export default class User extends UserModel {
  constructor(data) {
    super(data);
  }

  static async findAndDelete(filter, config) {
    const userList = await User.find(filter).exec();
    await User.deleteMany(filter, config);
    return userList;
  }
};