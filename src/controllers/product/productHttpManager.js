import ProductManager from './productManager.js';
import { BadRequest, NotFound } from "../../utils/error.js";

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
      let { limit = null, sort = '{}', page = null, query = '{}' } = req.query;
      limit = limit ? parseInt(limit) : limit;
      sort = JSON.parse(sort);
      page = page ? parseInt(page) : page;
      query = JSON.parse(query);
      const productManager = new ProductManager();
      const { totalDocs, ...rest } = await (productManager.getProducts({ limit, page, sort, query }));
      const { nextLink, prevLink } = productManager.calculateNextPrevPage(req, rest.nextPage, rest.prevPage);
      res.status(200).json({
        totalDocs,
        ...rest,
        prevLink: prevLink,
        nextLink: nextLink
      });
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(400).json({ message: error.message });
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }

  static async getProductsById (req, res) {
    try {
      const pid = req.params.pid;
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
      const pid = req.params.pid;
      const thumbnail = req.files.map((fileData) => fileData.originalname);
      const response =  await (new ProductManager()).updateProduct({ ...req.body, id: pid, thumbnail});
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(404).json({ message: error.message})
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }

  static async deleteProduct (req, res) {
    try {
      const pid = req.params.pid;
      const response = await (new ProductManager()).deleteProduct(pid);
      res.status(200).json({ deletedCount: response });
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(404).json({ message: error.message})
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }
}

const createPrevLink = (pathname,params) => {
  return `http://localhost:${process.env.PORT || 8080}${pathname}?${Object.entries(params).reduce(([paramName, paramValue])=> {

  },[]).join()}`;
}