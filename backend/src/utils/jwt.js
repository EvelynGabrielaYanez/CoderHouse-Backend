import jwt from "jsonwebtoken";
import passport from "passport";
import { Unauthorized } from "./error.js";

export const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

export const authVerification = (strategy) => {
  return async (req, res, next) => {
    if(unauthorizedEndpondList.includes(req.path)) return next();
    passport.authenticate(strategy, (error, user, info) => {
      if (error) return next(error);
      if (!user) return res.status(401).json({ error: info.message ? info.message : info.toString() })
      req.user = user
      next()
    })(req, res, next)
  }
}

export const current = (roles) => {
  return async (req, res, next) => {
    try {
      const userToValidate = req.user;
      if(!userToValidate || !roles.includes(userToValidate.role)) throw new Unauthorized('Usuario no autorizado');
      next()
    } catch (error) {
      if(error instanceof Unauthorized) return res.status(401).json({ message: "Unauthorized", error: error.message});
      res.status(500).json({ message: "Ocurrio un eror inestperado en el servidor", error: error.message});
    }
  }
}

const unauthorizedEndpondList = [
  '/api/session/login',
  '/api/user/register'
];