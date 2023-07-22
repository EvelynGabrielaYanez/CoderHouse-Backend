import { compareHash } from "../../utils/bcrypt.js";
import { BadRequest, ERROR_DICTIONARY, Unauthorized } from "../../utils/error.js";
import { generateToken } from "../../utils/jwt.js";
import UserManager from "../user/userManager.js";
import jwt from 'jsonwebtoken';

/**
 * Clase encargada de manejar la logica de negocio
 */
export default class SessionManager {
  static async login ({ email, password, user, token }) {
    if (!user) {
      const userBDD = await UserManager.getUser(email);
      if (!userBDD) throw new BadRequest(ERROR_DICTIONARY.USER_NOT_FOUND);
      if (!compareHash(password, userBDD.password)) throw new BadRequest(ERROR_DICTIONARY.INVALID_PASSWORD);
      const token = generateToken({ user: userBDD });
      return { token, userData: userBDD };
    }
    return jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) throw new Unauthorized(ERROR_DICTIONARY.INVALID_CREDENTIALS);
      return { token, message: "Creedenciales validas", userData: user } ;
    });
 }
}
