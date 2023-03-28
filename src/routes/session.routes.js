import { Router } from "express";import SessionHttpManager from "../controllers/session/sessionHttpManager.js";

const routerSession = Router();

routerSession.post("/login", SessionHttpManager.login);
routerSession.get("/logout", SessionHttpManager.logout);

export default routerSession;