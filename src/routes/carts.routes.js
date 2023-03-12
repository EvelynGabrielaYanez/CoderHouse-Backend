import { Router } from 'express';
import CartsHttpManager from '../wrappers/cartsHttpManager.js';

export const cartsRouter = Router();

cartsRouter.post('/', CartsHttpManager.save);
cartsRouter.get('/:cid', CartsHttpManager.getProducts);
cartsRouter.post('/:cid/product/:pid', CartsHttpManager.addProduct);