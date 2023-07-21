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
      console.log("error verify 1")
      const userBDD = await UserManager.getUser(email);
      console.log("error verify 2", userBDD)
      if (!userBDD) throw new BadRequest(ERROR_DICTIONARY.USER_NOT_FOUND);
      if (!compareHash(password, userBDD.password)) throw new BadRequest(ERROR_DICTIONARY.INVALID_PASSWORD);
      const token = generateToken({ user: userBDD });
      return { token, userData: userBDD };
    }
    return jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      console.log("error verify",err)
      if (err) throw new Unauthorized(ERROR_DICTIONARY.INVALID_CREDENTIALS);
      return { token, message: "Creedenciales validas", userData: user } ;
    });
 }
}
