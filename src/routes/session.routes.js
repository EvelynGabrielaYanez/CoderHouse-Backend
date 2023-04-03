import { Router } from "express";import SessionHttpManager from "../controllers/session/sessionHttpManager.js";
import passport from "passport";

const routerSession = Router();

routerSession.post("/login", passport.authenticate('login', { failureRedirect: '/failLogin' }), SessionHttpManager.login);

routerSession.get('/failLogin', async (req, res) => {
  console.error('Ocurrio un error en el login de usuario');
  res.send({ error: 'Error al logear el usuario'});
});

routerSession.get("/logout", SessionHttpManager.logout);

export default routerSession;