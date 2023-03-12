import { Router } from 'express';
import multer from 'multer';
import ProductHttpManager from '../wrappers/productHttpManager.js';

const upload = multer({
  storage: multer.diskStorage({
    destination: (req,file, cb) => {
      cb(null, 'src/public/img')
    },
    filename: (req,file,cb) => {
      cb(null, `${file.originalname}`)
    }
  })
});

export const productRouter = Router();

productRouter.post('/', upload.array('thumbnails'), ProductHttpManager.addProduct);

productRouter.get('/', ProductHttpManager.getProducts);

productRouter.get('/:pid', ProductHttpManager.getProductsById);

productRouter.put('/:pid', upload.array('thumbnails'), ProductHttpManager.updateProduct);

productRouter.delete('/:pid', ProductHttpManager.deleteProduct);
