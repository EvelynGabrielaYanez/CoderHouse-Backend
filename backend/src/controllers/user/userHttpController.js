import { BadRequest, NotFound } from "../../utils/error.js";
import UserManager from "./userController.js";

/**
 * Clase encargada de manejar la captura de errores, validar
 */
export default class UserHttpManager {
  static async create (req, res) {
    try {
      const { firstName, lastName, email, age } = req.body;
      const { token, user } = await UserManager.register({ firstName, lastName, email, age });
      res.cookie('jwt', token, { httpOnly: true });
      res.status(200).json({ status: 'success', user, token, message: 'Usuario creado con éxito'});
    } catch (error) {
      console.log(error.stack);
      if (error instanceof BadRequest) return res.status(400).json({ message: error.message });
      if (error instanceof NotFound) return res.status(404).json({ message: error.message });
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
 }
}