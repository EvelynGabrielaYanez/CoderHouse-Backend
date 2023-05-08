import { Router } from 'express';
import MessageHttpManager from '../controllers/message/messageHttpManager.js';
import { current } from '../utils/jwt.js';

const messageRouter = Router();

messageRouter.get('/', MessageHttpManager.getMessage);
messageRouter.post('/save', current(['User']) , MessageHttpManager.save);

export default messageRouter;