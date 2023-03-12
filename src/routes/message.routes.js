import { Router } from 'express';
import MessageHttpManager from '../wrappers/messageHttpManager.js';

const messageRouter = Router();

messageRouter.get("/", (req,res) => res.render("index", {}))
messageRouter.get('/message', MessageHttpManager.getMessage);

export default messageRouter;