import { BadRequest, NotFound } from "../../utils/error.js";
import UserManager from "./userController.js";

/**
 * Clase encargada de manejar la captura de errores, validar
 */
export default class UserHttpManager {
  static async create (req, res) {
    try {
      const { firstName, lastName, email, age, role , password } = req.body;
      if(typeof firstName !== 'string') throw new BadRequest('Parametros invalidos');
      if(typeof lastName !== 'string') throw new BadRequest('Parametros invalidos');
      if(typeof email !== 'string') throw new BadRequest('Parametros invalidos');
      if(typeof password !== 'string') throw new BadRequest('Parametros invalidos');
      if(role && typeof role !== 'string') throw new BadRequest('Parametros invalidos');
      if(isNaN(age)) throw new BadRequest('Parametros invalidos');
      const response = await UserManager.create({ firstName, lastName, email, age, role, password });
      res.status(200).json(response);
    } catch (error) {
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(400).json({ message: error.message });
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
 }
}