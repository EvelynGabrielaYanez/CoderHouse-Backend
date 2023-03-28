import { Router } from "express";
import UserHttpManager from "../controllers/user/userHttpController.js";

const routerUser = Router()

routerUser.post("/", UserHttpManager.create)

export default routerUser;
