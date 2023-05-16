import User from "../../dao/models/user.js";
import { createHash } from "../../utils/bcrypt.js";
import { BadRequest, ERROR_DICTIONARY, InvalidParams } from "../../utils/error.js";
import { generateToken } from "../../utils/jwt.js";
import { translate } from "../../utils/string.js";
import CartsManager from "../carts/cartsManager.js";

/**
 * Clase encargada de manejar la logica de negocio e interactuar con el modelo user de la base de datos
 */
export default class UserManager {
  static async create ({ email, firstName, lastName, age, role, password }) {
    const user = await UserManager.getUser(email);
    if (user) throw new InvalidParams(ERROR_DICTIONARY.USER_ALREADY_EXIST);
    const cart = await (new CartsManager()).save();
    return await User.create({ email, firstName, lastName, age, role, cart: cart._id, password: createHash(password) });
  }

  static async getUser(email) {
    return await User.findOne({ email }).populate('cart').exec();
  }

  static async findById(id) {
   return await User.findById(id).exec();
  }

  static async register({ email, firstName, lastName, age, password }) {
    const user = await UserManager.getUser(email);
    if (user) {
      throw new BadRequest(translate(ERROR_DICTIONARY.ALREDY_REGISTERED, email));
    }
    const newUser = await UserManager.create({ firstName, lastName, email, age, password });
    const token = generateToken(newUser);
    return { user: newUser, token};
  }
}
