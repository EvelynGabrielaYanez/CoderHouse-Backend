import { Router } from 'express';
import CartsHttpManager from '../controllers/carts/cartsHttpManager.js';
import { current } from '../utils/jwt.js';

const cartsRouter = Router();
cartsRouter.get('/', CartsHttpManager.getCarts);
cartsRouter.post('/', CartsHttpManager.save);
cartsRouter.get('/:cid', CartsHttpManager.getProducts);
cartsRouter.put('/:cid', CartsHttpManager.updateProducts);
cartsRouter.post('/:cid/purchase', CartsHttpManager.purchase);
cartsRouter.delete('/:cid', CartsHttpManager.deleteProducts);
cartsRouter.put('/:cid/product/:pid', CartsHttpManager.updateProductQty);
cartsRouter.post('/:cid/product/:pid', current(['User']),  CartsHttpManager.addProduct);
cartsRouter.delete('/:cid/product/:pid', CartsHttpManager.deleteProduct);

export default cartsRouter;