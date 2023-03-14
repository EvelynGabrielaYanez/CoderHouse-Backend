import ProductManager from '../dao/mongoDB/controllers/productManager.js';
import FsProductManager from '../dao/fileSystem/controllers/productManager.js';
import { BadRequest, NotFound } from "../utils/error.js";

/**
 * Clase encargada de manejar la captura de errores, validar
 */
export default class ProductHttpManager {
  static async addProduct (req, res) {
    try {
      const thumbnail = req.files.map((fileData) => fileData.originalname);
      const response = process.env.DB_SELECTION === 'MongoDB' ? await (new ProductManager()).addProduct({...req.body, thumbnail}) : await (new FsProductManager()).addProduct({...req.body, thumbnail});
      if (!response) throw new BadRequest(`El producto code: ${req.body.code} ya se encuentra cargado`);
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
 }

  static async getProducts (req, res) {
    try {
      const limit = parseInt(req.query.limit);
      if (req.query.limit && isNaN(limit)) throw new BadRequest('Parametro invalido');
      const response = process.env.DB_SELECTION === 'MongoDB' ? await (new ProductManager().getProducts(limit)) : await (new FsProductManager().getProducts(limit)) ;
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(400).json({ message: error.message });
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }

  static async getProductsById (req, res) {
    try {
      const pid = process.env.DB_SELECTION === 'MongoDB' ? req.params.pid : parseInt(req.params.pid);
      if (process.env.DB_SELECTION !== 'MongoDB' && req.params.pid && isNaN(pid)) throw new BadRequest('Parametro invalido');
      const response = process.env.DB_SELECTION === 'MongoDB' ? await (new ProductManager().getProductsById(pid)) : await (new FsProductManager().getProductsById(pid)) ;
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(404).json({ message: error.message})
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }

  static async updateProduct (req, res) {
    try {
      const pid = process.env.DB_SELECTION === 'MongoDB' ? req.params.pid : parseInt(req.params.pid);
      if (process.env.DB_SELECTION !== 'MongoDB' && req.params.pid && isNaN(pid)) throw new BadRequest('Parametro invalido');
      const thumbnail = req.files.map((fileData) => fileData.originalname);
      const response =  process.env.DB_SELECTION === 'MongoDB' ? await (new ProductManager()).updateProduct({ ...req.body, id: pid, thumbnail}) :  await (new FsProductManager()).updateProduct({ ...req.body, id: pid, thumbnail});
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(404).json({ message: error.message})
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }

  static async deleteProduct (req, res) {
    try {
      const pid = process.env.DB_SELECTION === 'MongoDB' ? req.params.pid : parseInt(req.params.pid);
      if (process.env.DB_SELECTION !== 'MongoDB' && req.params.pid && isNaN(pid)) throw new BadRequest('Parametro invalido');
      const response =  process.env.DB_SELECTION === 'MongoDB' ? await (new ProductManager()).deleteProduct(pid) : await (new FsProductManager()).deleteProduct(pid) ;
      res.status(200).json({ deletedCount: response });
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(404).json({ message: error.message})
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }
}