import { Router } from 'express';
import cartsRouter from './carts.routes.js';
import productRouter from './products.routes.js';
import routerSession from './session.routes.js';
import routerUser from './user.routes.js';
import viewsRouter from './views.routes.js';
import routerGithub from './github.routes.js';

const router = Router();

router.use('/', viewsRouter);
router.use('/authSession', routerGithub)
router.use('/api/products', productRouter);
router.use('/api/carts', cartsRouter);
router.use('/api/session', routerSession);
router.use('/api/user', routerUser);

export default router;