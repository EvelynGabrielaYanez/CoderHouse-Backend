import { Router } from "express";
import passport from "passport";
import SessionHttpManager from "../controllers/session/sessionHttpManager.js";

const routerPassport = Router();

routerPassport.post("/login", passport.authenticate('login', { failureRedirect: '/failLogin' }), SessionHttpManager.login);

routerPassport.get('/failLogin', async (req, res) => {
  console.error('Ocurrio un error en el login de usuario');
  res.send({ error: 'Error al logear el usuario'});
});

export default routerPassport;
