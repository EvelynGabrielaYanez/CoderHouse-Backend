import { Router } from 'express';
import MockingHttpManager from '../controllers/mocking/mockingHttpManager.js';

const mockingRouter = Router();

mockingRouter.get('/mockingProducts', MockingHttpManager.insertProducts);

export default mockingRouter;
