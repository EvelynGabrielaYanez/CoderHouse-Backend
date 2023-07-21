
import CartsManager from '../../service/carts/cartsManager.js';
import { BadRequest, ERROR_DICTIONARY } from "../../utils/error.js";
import ProductManager from '../../service/product/productManager.js';
/**
 * Clase encargada de manejar la captura de errores, validar
 */
export default class CartsHttpManager {
  /**
   * Obtiene el listado de productos correpsondientes a un carrito
   * @param {*} req
   * @param {*} res
   */
  static async getProducts (req, res, next) {
    try {
      console.log("entra a carts")
      const cid = req.params.cid;
      const response = await (new CartsManager().getCartsProducts(cid));
      console.log(response)
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Método encargado de guardar un nuevo carrito
   * @param {*} req
   * @param {*} res
   */
  static async save (_req, res, next) {
    try {
      const response = await (new CartsManager().save());
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Mètodo encargado de recibir la peticion, validar los parametros recibidos,
   *
   * @param {*} req
   * @param {*} res
   */
  static async addProduct (req, res, next) {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const { _id: ownerId, role: ownerRole } = req.user;
      const response = await (new CartsManager().addProduct({ cid, pid, ownerId, ownerRole }));
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Mètodo encargado de recibir la peticion, validar los parametros recibidos,
   *
   * @param {*} req
   * @param {*} res
   */
    static async updateProducts (req, res, next) {
      try {
        const products = req.body;
        const cid = req.params.cid;
        for(const {product, quantity} of products) {
            if(!product || isNaN(quantity)) throw new BadRequest(ERROR_DICTIONARY.INVALID_PARAMS);
            const productFinded = await new ProductManager().getProductsById(product);
            if(!productFinded) throw new BadRequest(ERROR_DICTIONARY.INVALID_PARAMS);
        }
        const response = await (new CartsManager().updateProducts(cid, products));
        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    }
      /**
   * Mètodo encargado de recibir la peticion, validar los parametros recibidos,
   *
   * @param {*} req
   * @param {*} res
   */
  static async updateProductQty (req, res, next) {
    try {
      const { cid, pid } = req.params;
      const qty = parseInt(req.body.qty);
      if (Number.isNaN(qty)) throw new BadRequest(ERROR_DICTIONARY.INVALID_PARAMS);
      const response = await (new CartsManager().updateProductQty({ cid, pid , qty }));
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Mètodo encargado de recibir la peticion, validar los parametros recibidos,
   *
   * @param {*} req
   * @param {*} res
   */
  static async deleteProduct (req, res, next) {
    try {
      const { cid, pid } = req.params;
      const response = await (new CartsManager().deleteProduct({ cid, pid }));
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Mètodo encargado de borrar todos los productos de un carrito
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async deleteProducts (req, res, next) {
    try {
      const { cid } = req.params;
      const response = await (new CartsManager().deleteProducts(cid));
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getCarts(_req, res, next) {
    try {
      const response = await (new CartsManager().getCarts());
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async purchase(req, res, next) {
    try {
      const cid = req.params.cid;
      const { user } = req;
      const response = await (new CartsManager().purchase(cid, user.email));
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}