import { Router } from "express";
import UserHttpManager from "../controllers/user/userHttpController.js";
import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
    destination: (req,file, cb) => {
      cb(null, 'src/public/documents')
    },
    filename: (req,file,cb) => {
      cb(null, `${file.originalname}`)
    }
  })
});


const routerUser = Router()

routerUser.post("/", UserHttpManager.create);
routerUser.post("/:uid/documents", upload.array('documents'), UserHttpManager.saveDocument);
routerUser.post("/premium/:uid", UserHttpManager.changeRole);
routerUser.post("/send-recover-email", UserHttpManager.sendRecoverEmail);
routerUser.post("/recover/:token", UserHttpManager.recover);

export default routerUser;
