import { Router } from "express";import SessionHttpManager from "../controllers/session/sessionHttpManager.js";

const routerSession = Router();

routerSession.post("/login", SessionHttpManager.login);

routerSession.get("/logout", SessionHttpManager.logout);
routerSession.get("/current", SessionHttpManager.getCurrent);

export default routerSession;