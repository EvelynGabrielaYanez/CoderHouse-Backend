import { Router } from "express";
import UserHttpManager from "../controllers/user/userHttpController.js";
import passport from "passport";

const routerUser = Router()

routerUser.post("/", )

routerUser.post("/", passport.authenticate('register', { failureRedirect: '/failRegister' }), UserHttpManager.create);

routerUser.get('/failRegister', async (req, res) => {
  console.error('Ocurrio un error en la estrategia de registro de usuario');
  res.send({ error: 'Error al registrar el usuario'});
});

export default routerUser;
