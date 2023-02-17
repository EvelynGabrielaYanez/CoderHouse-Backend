import { BadRequest, NotFound } from "../../utils/error.js";
import ProductManager from "./productManager.js";

/**
 * Clase encargada de manejar la captura de errores, validar
 */
export default class ProductHttpManager {
  static async addProduct (req, res) {
    try {
      const thumbnail = req.files.map((fileData) => fileData.originalname);
      const response = await (new ProductManager()).addProduct({...req.body, thumbnail});
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
      const response = await (new ProductManager()).getProducts(limit);
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(400).json({ message: error.message });
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }

  static async getProductsById (req, res) {
    try {
      const pid = parseInt(req.params.pid);
      if (req.params.pid && isNaN(pid)) throw new BadRequest('Parametro invalido');
      const response = await (new ProductManager().getProductsById(pid));
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(404).json({ message: error.message})
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }

  static async updateProduct (req, res) {
    try {
      const pid = parseInt(req.params.pid);
      if (req.params.pid && isNaN(pid)) throw new BadRequest('Parametro invalido');
      const thumbnail = req.files.map((fileData) => fileData.originalname);
      const response = await (new ProductManager()).updateProduct({ ...req.body, id: pid, thumbnail});
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(404).json({ message: error.message})
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }

  static async deleteProduct (req, res) {
    try {
      const pid = parseInt(req.params.pid);
      if (req.params.pid && isNaN(pid)) throw new BadRequest('Parametro invalido');
      const response = await (new ProductManager()).deleteProduct(pid);
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(404).json({ message: error.message})
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }
}