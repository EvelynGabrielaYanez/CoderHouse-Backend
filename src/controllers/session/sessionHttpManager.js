import { BadRequest, NotFound, Unauthorized } from "../../utils/error.js";
import SessionManager from "./sessionManager.js";

/**
 * Clase encargada de manejar la captura de errores, validar
 */
export default class SessionHttpManager {
  static async login (req, res) {
    try {
      if (!req.user) throw new Unauthorized('Credenciales invalidas');
      const { email, firstName, lastName, age } = req.user;
      req.session.user = {
        firstName,
        lastName,
        email,
        age
      };
      res.status(200).json({
        userData: {
          firstName: req.user.firstName,
          lastName: req.user.lastName
        }
      });
    } catch (error) {
      console.error({ message: error.message, stack: error.stack});
      if (error instanceof Unauthorized) return res.status(401).json({ status: "error", error: error.message })
      console.log("BR",error instanceof BadRequest);
      console.log("NF",error instanceof NotFound);
      if (error instanceof BadRequest) return res.status(400).json({ message: 'Usuario o contraseña invalidos' });
      if (error instanceof NotFound) return res.status(400).json({ message: 'Usuario o contraseña invalidos' });
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
 }

 static async logout (req, res) {
    try {
      const { session } = req;
      if(!session) throw new BadRequest('Sesión invalida');
      SessionManager.logout(session);
      res.redirect('/login');
    } catch (error) {
      console.error({ message: error.message, stack: error.stack});
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }

  static githubLogin (req, res) {
    req.session.user = res.user;
    res.redirect('/');
  }
}
