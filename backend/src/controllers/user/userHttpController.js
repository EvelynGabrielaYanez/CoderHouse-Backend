import UserManager from "../../service/user/userManager.js";
import { ERROR_DICTIONARY, InvalidParams } from "../../utils/error.js";
import { translate } from "../../utils/string.js";

/**
 * Clase encargada de manejar la captura de errores, validar
 */
export default class UserHttpManager {
  static async create (req, res, next) {
    try {
      const { firstName, lastName, email, age, password } = req.body;
      if (!firstName || !lastName || !email || !age || !password ) throw new InvalidParams(translate(ERROR_DICTIONARY.CREATE_USER_INVALID_PARAMS, firstName, lastName, email, age));
      const { token, user } = await UserManager.register({ firstName, lastName, email, age, password });
      res.cookie('jwt', token, { httpOnly: true });
      res.status(200).json({ status: 'success', user, token, message: 'Usuario creado con éxito'});
    } catch (error) {
      next(error);
    }
 }
}