import ProductManager from '../../service/product/productManager.js';
import { BadRequest, ERROR_DICTIONARY } from "../../utils/error.js";
import { translate } from '../../utils/string.js';

/**
 * Clase encargada de manejar la captura de errores, validar
 */
export default class ProductHttpManager {
  static async addProduct (req, res, next) {
    try {
      const { _id: owner } = req.user;
      const thumbnail = req.files.map((fileData) => fileData.originalname);
      const response = await (new ProductManager()).addProduct({...req.body, thumbnail, owner});
      if (!response) throw new BadRequest(translate(ERROR_DICTIONARY.PRODUCT_ALREDY_LOADED, req.body.code));
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
 }

  static async getProducts (req, res, next) {
    try {
      let { limit = null, sort , page = null, category, stock} = req.query || {};
      limit = limit ? parseInt(limit) : limit;
      sort = sort && ['asc', 'desc'].includes(sort) ? { price: sort} : undefined;
      page = page ? parseInt(page) : page;
      const productManager = new ProductManager();
      const query = {};
      if (category) query.category = category;
      if (stock) query.stock = stock;
      const { totalDocs, ...rest } = await (productManager.getProducts({ limit, page, sort, query }));
      const { nextLink, prevLink } = productManager.calculateNextPrevPage(req, rest.nextPage, rest.prevPage);
      res.status(200).json({
        totalDocs,
        ...rest,
        prevLink: prevLink,
        nextLink: nextLink
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProductsById (req, res, next) {
    try {
      const pid = req.params.pid;
      const response = await (new ProductManager().getProductsById(pid));
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct (req, res, next) {
    try {
      const pid = req.params.pid;
      const { _id: owner, role } = req.user ?? {};
      const thumbnail = req.files.map((fileData) => fileData.originalname);
      const response = await (new ProductManager()).updateProduct({ ...req.body, id: pid, thumbnail, owner, role });
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct (req, res, next) {
    try {
      const pid = req.params.pid;
      const { _id: owner, role } = req.user ?? {};
      const response = await (new ProductManager()).deleteProduct(pid, { owner, role });
      res.status(200).json({ deletedCount: response });
    } catch (error) {
      next(error);
    }
  }
}
