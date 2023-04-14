import User from "../../dao/models/user.js";
import { createHash } from "../../utils/bcrypt.js";
import { InvalidParams } from "../../utils/error.js";
import CartsManager from "../carts/cartsManager.js";

/**
 * Clase encargada de manejar la logica de negocio e interactuar con el modelo user de la base de datos
 */
export default class UserManager {
  static async create ({ email, firstName, lastName, age, role, password }) {
    const user = await UserManager.getUser(email);
    if (user) throw new InvalidParams('El usuario ya existe');
    const cart = await (new CartsManager()).save();
    return await User.create({ email, firstName, lastName, age, role, cart: cart._id, password: createHash(password) });
 }

 static async getUser(email) {
  return await User.findOne({ email }).populate('cart').exec();
 }
 static async findById(id) {
   return await User.findById(id).exec();
 }
}
