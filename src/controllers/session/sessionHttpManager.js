import { BadRequest, NotFound, Unauthorized } from "../../utils/error.js";
import SessionManager from "./sessionManager.js";

/**
 * Clase encargada de manejar la captura de errores, validar
 */
export default class SessionHttpManager {
  static async login (req, res) {
    try {
      if (!req.user) throw new Unauthorized('Credenciales invalidas');
      const { email, firstName, lastName, age, cart } = req.user;
      req.session.user = {
        firstName,
        lastName,
        email,
        age,
        cart
      };
      res.status(200).json({
        userData: {
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          cartId: req.user.cart._id
        }
      });
    } catch (error) {
      console.error({ message: error.message, stack: error.stack});
      if (error instanceof Unauthorized) return res.status(401).json({ status: "error", error: error.message })
      if (error instanceof BadRequest) return res.status(400).json({ message: 'Usuario o contraseña invalidos', status: 'error' });
      if (error instanceof NotFound) return res.status(400).json({ message: 'Usuario o contraseña invalidos', status: 'error' });
      res.status(500).json({ message: error.message, stack: error.stack, status: 'error'} );
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
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message, status: 'error' });
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }

  static githubLogin (req, res) {
    req.session.user = res.user;
    res.redirect('/');
  }

  static getCurrent(req, res) {
    try {
      if (!req.session?.user) throw new BadRequest('No hay ninguna sesión');
      res.status(200).json(req.session.user);
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message, status: 'error' });
      res.status(500).json({ message: error.message, stack: error.stack, status: 'error'} );
    }
  }
}
