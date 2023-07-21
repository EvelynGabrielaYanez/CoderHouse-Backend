import { Router } from 'express';
import multer from 'multer';
import ProductHttpManager from '../controllers/product/productHttpManager.js';
import { current } from '../utils/jwt.js';
import { USER_ROLES } from '../utils/constants.js';

const upload = multer({
  storage: multer.diskStorage({
    destination: (req,file, cb) => {
      cb(null, 'src/public/products')
    },
    filename: (req,file,cb) => {
      cb(null, `${file.originalname}`)
    }
  })
});

const productRouter = Router();

productRouter.post('/', upload.array('thumbnails'), current([USER_ROLES.ADMIN, USER_ROLES.PREMIUM]), ProductHttpManager.addProduct);

productRouter.get('/', ProductHttpManager.getProducts);

productRouter.get('/:pid', ProductHttpManager.getProductsById);

productRouter.put('/:pid', upload.array('thumbnails'), current([USER_ROLES.ADMIN, USER_ROLES.PREMIUM]), ProductHttpManager.updateProduct);

productRouter.delete('/:pid', current([USER_ROLES.ADMIN, USER_ROLES.PREMIUM]), ProductHttpManager.deleteProduct);

export default productRouter;
