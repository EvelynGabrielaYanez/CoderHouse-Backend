import { compareHash } from "../../utils/bcrypt.js";
import { Unauthorized } from "../../utils/error.js";
import { generateToken } from "../../utils/jwt.js";
import UserManager from "../user/userController.js";
/**
 * Clase encargada de manejar la logica de negocio
 */
export default class SessionManager {
  static async login ({ email, password, user }) {
    if (!user) {
      console.log(email);
      const userBDD = await UserManager.getUser(email)
      if (!userBDD) throw new Unauthorized("User no encontrado");
      if (!compareHash(password, userBDD.password)) throw new Unauthorized('Contraseña no valida');
      const token = generateToken(userBDD);
      console.log('test', token);
      return { token, userData: userBDD };
    }
    const token = req.cookies.jwt;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      console.log("decodificado",decodedToken);
      if (err) throw new Unauthorized("Credenciales no válidas");
      return { message: "Creedenciales validas" } ;
    });
 }

  static async logout (session) {
    if(session?.user) session.destroy();
  }
}
