import { Router } from 'express';
import CartsHttpManager from '../controllers/carts/cartsHttpManager.js';

const cartsRouter = Router();
cartsRouter.get('/', CartsHttpManager.getCarts);
cartsRouter.post('/', CartsHttpManager.save);
cartsRouter.get('/:cid', CartsHttpManager.getProducts);
cartsRouter.put('/:cid', CartsHttpManager.updateProduct); // VER
cartsRouter.delete('/:cid', CartsHttpManager.deleteProducts);
cartsRouter.put('/:cid/product/:pid', CartsHttpManager.updateProductQty);
cartsRouter.post('/:cid/product/:pid', CartsHttpManager.addProduct);
cartsRouter.delete('/:cid/product/:pid', CartsHttpManager.deleteProduct);

export default cartsRouter;