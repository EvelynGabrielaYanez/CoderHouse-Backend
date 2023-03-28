import { BadRequest, NotFound } from "../../utils/error.js";
import SessionManager from "./sessionManager.js";

/**
 * Clase encargada de manejar la captura de errores, validar
 */
export default class SessionHttpManager {
  static async login (req, res) {
    try {
      const { email, password } = req.body;
      console.log(req.body,password, email);
      if (!email || typeof email !=='string') throw new BadRequest('Parametros invalidos');
      if (!password || typeof password !=='string') throw new BadRequest('Parametros invalidos');
      const user = await SessionManager.login({ email, password });
      req.session.email = user.email;
      req.session.firstName = user.firstName;
      req.session.lastName = user.lastName;
      req.session.role = user.role;
      req.session.login = true;
      res.status(200).json({
        userData: {
          firstName: user.firstName,
          lastName: user.lastName
        }
      });
    } catch (error) {
      console.error({ message: error.message, stack: error.stack});
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
}
