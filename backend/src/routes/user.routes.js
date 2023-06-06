import { Router } from "express";
import UserHttpManager from "../controllers/user/userHttpController.js";

const routerUser = Router()

routerUser.post("/", UserHttpManager.create);
routerUser.post("/premium/:uid", UserHttpManager.changeRole);
routerUser.post("/send-recover-email", UserHttpManager.sendRecoverEmail);
routerUser.post("/recover/:token", UserHttpManager.recover);

export default routerUser;
