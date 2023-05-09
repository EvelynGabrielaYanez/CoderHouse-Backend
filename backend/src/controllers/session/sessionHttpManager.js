import passport from "passport";
import { BadRequest, NotFound, Unauthorized } from "../../utils/error.js";
import SessionManager from "../../service/session/sessionManager.js";

/**
 * Clase encargada de manejar la captura de errores, validar
 */
export default class SessionHttpManager {
  static async login(req, res, next) {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      try {
        if (err) throw new Unauthorized("Error en consulta de token");
        const { email, password } = req.body;
        const token = req.cookies?.jwt;
        const response = await SessionManager.login({ email, password, user, token });
        if (response.token) res.cookie('jwt', response.token, { httpOnly: true });
        else req.user = user;
        res.status(200).json(response);
      } catch (error) {
        console.error({ message: error.message, stack: error.stack });
        if (error instanceof Unauthorized) return res.status(401).json({ status: "error", error: error.message })
        if (error instanceof BadRequest) return res.status(400).json({ message: 'Usuario o contraseña invalidos', status: 'error' });
        if (error instanceof NotFound) return res.status(400).json({ message: 'Usuario o contraseña invalidos', status: 'error' });
        res.status(500).json({ message: error.message, stack: error.stack, status: 'error' });
      }
    })(req, res, next);
  }

  static async logout(req, res) {
    try {
      const { jwt } = req.cookies;
      if (!jwt) throw new BadRequest('Sesión invalida');
      res.clearCookie('jwt');
      res.status(200).json({ message: 'Logout con exito' })
    } catch (error) {
      console.error({ message: error.message, stack: error.stack });
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message, status: 'error' });
      res.status(500).json({ message: error.message, stack: error.stack });
    }
  }

  static githubLogin(req, res) {
    req.session.user = res.user;
    res.redirect('/');
  }

  static getCurrent(req, res) {
    try {
      if (!req?.user) throw new BadRequest('No hay ninguna sesión');
      res.status(200).json(req?.user);
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message, status: 'error' });
      res.status(500).json({ message: error.message, stack: error.stack, status: 'error' });
    }
  }
}
