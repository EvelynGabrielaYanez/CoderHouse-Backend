import { Router } from 'express';
import ViewManager from '../controllers/views/viewsManager.js';
import { passportError } from '../utils/errorMessage.js';

const viewsRouter = Router();

viewsRouter.get('/', ViewManager.home);

viewsRouter.get('/login', ViewManager.login)

viewsRouter.get("/products", passportError('jwt') ,ViewManager.products);

viewsRouter.get('/create-user', ViewManager.createUser);

viewsRouter.get("/cart/:cid", ViewManager.cart);

export default viewsRouter;
