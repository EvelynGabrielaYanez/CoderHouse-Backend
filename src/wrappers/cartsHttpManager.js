
import CartsManager from '../dao/mongoDB/controllers/cartsManager.js';
import { BadRequest, NotFound } from "../utils/error.js";
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
      const cid = process.env.DB_SELECTION === 'MongoDB' ? req.params.cid : parseInt(req.params.cid);
      if (process.env.DB_SELECTION !== 'MongoDB' && req.params.cid && isNaN(cid)) throw new BadRequest('Parametro invalido');
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
      const cid = process.env.DB_SELECTION === 'MongoDB' ? req.params.cid : parseInt(req.params.cid);
      const pid = process.env.DB_SELECTION === 'MongoDB' ? req.params.pid : parseInt(req.params.pid);
      if (process.env.DB_SELECTION !== 'MongoDB' && req.params.cid && isNaN(cid)) throw new BadRequest('Parametro invalido');
      if (process.env.DB_SELECTION !== 'MongoDB' && req.params.pid && isNaN(pid)) throw new BadRequest('Parametro invalido');
      const response = await (new CartsManager().addProduct({ cid, pid }));
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(404).json({ message: error.message });
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }
}