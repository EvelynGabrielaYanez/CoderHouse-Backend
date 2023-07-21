import jwt from "jsonwebtoken";
import passport from "passport";
import { ERROR_DICTIONARY, Unauthorized } from "./error.js";
import { publicRoutes, swaggerApi, unauthorizedEndpondList } from "./constants.js";

export const generateToken = ({ user, expiresIn }) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: expiresIn || '24h' });
}

export const authVerification = (strategy) => {
  return async (req, res, next) => {
    if(unauthorizedEndpondList.includes(req.path) ||
      req.path.includes(swaggerApi) ||
      publicRoutes.some(publicRoute => req.path.startsWith(publicRoute))) return next();
    passport.authenticate(strategy, (error, user, info) => {
      if (error) return next(error);
      if (!user) return res.status(401).json({ error: info.message ?? info.toString() });
      req.user = user;
      next();
    })(req, res, next)
  }
}

export const current = (roles) => {
  return async (req, res, next) => {
    try {
      const userToValidate = req.user;
      if(!userToValidate || !roles.includes(userToValidate.role)) throw new Unauthorized(ERROR_DICTIONARY.UNAUTHORIZED_USER);
      next()
    } catch (error) {
      if(error instanceof Unauthorized) return res.status(401).json({ message: "Unauthorized", error: error.message});
      res.status(500).json({ message: "Ocurrio un eror inestperado en el servidor", error: error.message});
    }
  }
}
