import { Router } from 'express';
import MessageHttpManager from '../controllers/message/messageHttpManager.js'

const messageRouter = Router();

messageRouter.get("/", (req,res) => res.render("chat", {}))
messageRouter.get('/message', MessageHttpManager.getMessage);

export default messageRouter;