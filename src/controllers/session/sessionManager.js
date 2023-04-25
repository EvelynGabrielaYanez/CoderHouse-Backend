import { compareHash } from "../../utils/bcrypt.js";
import { BadRequest, InvalidParams } from "../../utils/error.js";
import UserManager from "../user/userController.js";

/**
 * Clase encargada de manejar la logica de negocio
 */
export default class SessionManager {
  static async login ({ email, password }) {
    const user = await UserManager.getUser(email);
    if (!user || !compareHash(password, user.password)) throw new BadRequest('Usuario o contraseña invalidos');
    return user;
 }

  static async logout (session) {
    if(session?.user) session.destroy();
  }
}
