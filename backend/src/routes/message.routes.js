import { Router } from 'express';
import MessageHttpManager from '../controllers/message/messageHttpManager.js';
import { current } from '../utils/jwt.js';
import { USER_ROLES } from '../utils/constants.js';

const messageRouter = Router();

messageRouter.get('/', MessageHttpManager.getMessage);
messageRouter.post('/save', current([USER_ROLES.USER]) , MessageHttpManager.save);

export default messageRouter;