import passport from "passport";
import { BadRequest, ERROR_DICTIONARY, Unauthorized } from "../../utils/error.js";
import SessionManager from "../../service/session/sessionManager.js";

/**
 * Clase encargada de manejar la captura de errores, validar
 */
export default class SessionHttpManager {
  static async login(req, res, next) {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      try {
        if (err) throw new Unauthorized(ERROR_DICTIONARY.ERROR_GETTING_TOKEN);
        const { email, password } = req.body;
        const token = req.cookies?.jwt;
        const response = await SessionManager.login({ email, password, user, token });
        if (response.token) {
          res.cookie('jwt', response.token, { httpOnly: false });
        }
        else req.user = user;
        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  }

  static async logout(req, res, next) {
    try {
      const { jwt } = req.cookies;
      if (!jwt) throw new BadRequest(ERROR_DICTIONARY.INVALID_SESSION);
      res.clearCookie('jwt');
      res.status(200).json({ message: 'Logout con exito' })
    } catch (error) {
      next(error);
    }
  }

  static githubLogin(req, res) {
    req.session.user = res.user;
    res.redirect('/');
  }

  static getCurrent(req, res, next) {
    try {
      if (!req?.user) throw new BadRequest(ERROR_DICTIONARY.NO_SESSION);
      res.status(200).json(req?.user);
    } catch (error) {
      next(error);
    }
  }
}
