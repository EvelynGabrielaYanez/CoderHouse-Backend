import { Router } from "express";
import UserHttpManager from "../controllers/user/userHttpController.js";

const routerUser = Router()

routerUser.post("/", )

routerUser.post("/", UserHttpManager.create);
routerUser.post("/send-recover-email", UserHttpManager.sendRecoverEmail);
routerUser.post("/recover", UserHttpManager.recover);

export default routerUser;
