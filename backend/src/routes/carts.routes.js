import { Router } from 'express';
import CartsHttpManager from '../controllers/carts/cartsHttpManager.js';
import { current } from '../utils/jwt.js';
import { USER_ROLES } from '../utils/constants.js';

const cartsRouter = Router();
cartsRouter.get('/', CartsHttpManager.getCarts);
cartsRouter.post('/', CartsHttpManager.save);
cartsRouter.get('/:cid', CartsHttpManager.getProducts);
cartsRouter.put('/:cid', CartsHttpManager.updateProducts);
cartsRouter.delete('/:cid', CartsHttpManager.deleteProducts);
cartsRouter.post('/:cid/purchase', CartsHttpManager.purchase);
cartsRouter.put('/:cid/product/:pid', CartsHttpManager.updateProductQty);
cartsRouter.post('/:cid/product/:pid', current([USER_ROLES.USER, USER_ROLES.PREMIUM]),  CartsHttpManager.addProduct);
cartsRouter.delete('/:cid/product/:pid', CartsHttpManager.deleteProduct);

export default cartsRouter;