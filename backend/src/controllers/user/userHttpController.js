import UserManager from "../../service/user/userManager.js";
import { ERROR_DICTIONARY, InvalidParams } from "../../utils/error.js";
import { translate } from "../../utils/string.js";

/**
 * Clase encargada de manejar la captura de errores, validar
 */
export default class UserHttpManager {
  /**
   * Método encargado de crear un usuario
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async create(req, res, next) {
    try {
      const { firstName, lastName, email, age, password } = req.body;
      if (!firstName || !lastName || !email || !age || !password) throw new InvalidParams(translate(ERROR_DICTIONARY.CREATE_USER_INVALID_PARAMS, firstName, lastName, email, age));
      const { user } = await UserManager.register({ firstName, lastName, email, age, password });
      res.status(200).json({ status: 'success', user, message: 'Usuario creado con éxito' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Método encargado de actualizar la contraseña del usuario.
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async recover (req, res, next) {
    try {
      const { newPassword, email } = req.body;
      const userData = await UserManager.recover({ email, newPassword });
      // Elimino el token de recuperacion y deslogeao al usuario si se encontraba logeado
      res.clearCookie('jwtRecover');
      res.status(200).json({ status: 'success', message: 'Password generada con éxito', userData });
    } catch (error) {
      next(error);
    }
  }

  static async sendRecoverEmail (req, res, next) {
    try {
      const { email } = req.body;
      const { token, sendEmailDetail: detail } = await UserManager.sendRecoverEmail(email);
      res.cookie('jwtRecover', token, { httpOnly: true });
      res.status(200).json({ status: 'success', message: 'Email enviado con éxito.', token, detail });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Métod encargado de cambiar el role a premium o user segun corresponda
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async changeRole (req, res, next) {
    try {
      const { _id: id, role } = req.user;
      const response = await UserManager.changeRole({ id, role });
      res.status(200).json({ status: 'success', message: 'Rol cambiado con éxito.', response });
    } catch (error) {
      next(error);
    }
  }

  static async saveDocument (req, res, next) {
    try {
      const { uid: userId } = req.params;
      const documents = req.files?.map((fileData) => fileData.originalname) || [];
      if (!documents.length) throw new InvalidParams(ERROR_DICTIONARY.INVALID_PARAMS);
      documents.forEach((fileName) => {
        if (!fileName || typeof fileName !== 'string') throw new InvalidParams(ERROR_DICTIONARY.INVALID_PARAMS);
      });
      const response = await UserManager.saveDocument({ userId, documents });
      res.status(200).json({ status: 'success', message: 'Rol cambiado con éxito.', response });
    } catch (error) {
      next(error);
    }
  }

  static async findAll (_req, res, next) {
    try {
      const response = (await UserManager.findAll())
                                        .map(({ firstName, lastName, email, agre, role }) => ({ firstName, lastName, email, agre, role }));
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async delete (_req, res, next) {
    try {
      const response = await UserManager.deleteInactives();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
