
import CartsManager from './cartsManager.js';
import { BadRequest, NotFound } from "../../utils/error.js";
import ProductManager from '../product/productManager.js';
/**
 * Clase encargada de manejar la captura de errores, validar
 */
export default class CartsHttpManager {
  /**
   * Obtiene el listado de productos correpsondientes a un carrito
   * @param {*} req
   * @param {*} res
   */
  static async getProducts (req, res) {
    try {
      const cid = req.params.cid;
      const response = await (new CartsManager().getCartsProducts(cid));
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(404).json({ message: error.message });
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }

  /**
   * Método encargado de guardar un nuevo carrito
   * @param {*} req
   * @param {*} res
   */
  static async save (req, res) {
    try {
      const response = await (new CartsManager().save());
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(404).json({ message: error.message });
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }

  /**
   * Mètodo encargado de recibir la peticion, validar los parametros recibidos,
   *
   * @param {*} req
   * @param {*} res
   */
  static async addProduct (req, res) {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const response = await (new CartsManager().addProduct({ cid, pid }));
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(404).json({ message: error.message });
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }

  /**
   * Mètodo encargado de recibir la peticion, validar los parametros recibidos,
   *
   * @param {*} req
   * @param {*} res
   */
    static async updateProducts (req, res) {
      try {
        const products = req.body;
        const cid = req.params.cid;
        for(const {product, quantity} of products) {
            if(!product || isNaN(quantity)) throw new BadRequest('Parametros invalidos');
            const productFinded = await new ProductManager().getProductsById(product);
            if(!productFinded) throw new BadRequest('Parametros invalidos');
        }
        const response = await (new CartsManager().updateProducts(cid, products));
        res.status(200).json(response);
      } catch (error) {
        if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
        if (error instanceof NotFound) return res.status(404).json({ message: error.message });
        res.status(500).json({ message: error.message, stack: error.stack} );
      }
    }
      /**
   * Mètodo encargado de recibir la peticion, validar los parametros recibidos,
   *
   * @param {*} req
   * @param {*} res
   */
  static async updateProductQty (req, res) {
    try {
      const { cid, pid } = req.params;
      const qty = parseInt(req.body.qty);
      if (Number.isNaN(qty)) throw new BadRequest('Parametros invalidos');
      const response = await (new CartsManager().updateProductQty({ cid, pid , qty }));
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(404).json({ message: error.message });
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }

  /**
   * Mètodo encargado de recibir la peticion, validar los parametros recibidos,
   *
   * @param {*} req
   * @param {*} res
   */
  static async deleteProduct (req, res) {
    try {
      const { cid, pid } = req.params;
      const response = await (new CartsManager().deleteProduct({ cid, pid }));
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(404).json({ message: error.message });
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }

  /**
   * Mètodo encargado de borrar todos los productos de un carrito
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  static async deleteProducts (req, res) {
    try {
      const { cid } = req.params;
      const response = await (new CartsManager().deleteProducts(cid));
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(404).json({ message: error.message });
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }

  static async getCarts(req, res) {
    try {
      const response = await (new CartsManager().getCarts());
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(404).json({ message: error.message });
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }
}