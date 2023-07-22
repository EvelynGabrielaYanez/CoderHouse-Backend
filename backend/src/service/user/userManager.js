import config from "../../configuration/config.js";
import Carts from "../../dao/models/carts.js";
import User from "../../dao/models/user.js";
import { compareHash, createHash } from "../../utils/bcrypt.js";
import { USER_ROLES, baseURL } from "../../utils/constants.js";
import { subtractDays } from "../../utils/date.js";
import { Conflict, ERROR_DICTIONARY, InvalidParams } from "../../utils/error.js";
import { generateToken } from "../../utils/jwt.js";
import { translate } from "../../utils/string.js";
import CartsManager from "../carts/cartsManager.js";
import MailManager from "../mail/mailManager.js";

/**
 * Clase encargada de manejar la logica de negocio e interactuar con el modelo user de la base de datos
 */
export default class UserManager {
  /**
   * Método encargado de crear un usuario.
   * @param {{ email: string, firstName: string, lastName: string, age: number, password: string }} userData
   * @returns {User}
   */
  static async create ({ email, firstName, lastName, age, role, password }) {
    const user = await UserManager.getUser(email);
    if (user) throw new InvalidParams(ERROR_DICTIONARY.USER_ALREADY_EXIST);
    const cart = await (new CartsManager()).save();
    return User.create({ email, firstName, lastName, age, role, cart: cart._id, password: createHash(password) });
  }

  /**
   * Método encargado de buscar un usuario por email
   * @param {string} email
   * @returns {User}
   */
  static async getUser(email) {
    return User.findOne({ email }).populate('cart').exec();
  }

  /**
   * Método encargado de buscar un usuario por id
   * @param {string} id
   * @returns {User}
   */
  static async findById(id) {
   return User.findById(id).exec();
  }

  /**
   * Método encargado de buscar un usuario por id
   * @returns {[User]}
   */
  static async findAll() {
    return User.find().exec();
  }

  /**
   * Método encargado de eliminar un usuario por fecha limite de conexion
   * @returns {{ limitDate: Date }}
   */
  static async delete({ limitDate }) {
    const deletedUsers = await User.findAndDelete({
      last_connection: {
        "$lt": limitDate
      }
    });
    const idList = deletedUsers.map(user => user.cart._id);
    await Carts.deleteMany({ _id: { $in: idList } });
    return deletedUsers;
  }

  /**
   * Método encargado de eliminar todos los usuarios inactivos en los ultimos dos dias
   * @returns
   */
  static async deleteInactives() {
    return UserManager.delete({ limitDate: subtractDays(new Date(), 2) });
  }

  /**
   * Método encargado de registrar un usuario
   * @param {{ email: string, firstName: string, lastName: string, age: number, password: string }} UserData
   * @returns {{ user: User }}
   */
  static async register({ email, firstName, lastName, age, password }) {
    const user = await UserManager.getUser(email);
    if (user) throw new Conflict(translate(ERROR_DICTIONARY.ALREDY_REGISTERED, email));
    return {
      user: await UserManager.create({ firstName, lastName, email, age, password })
    };
  }

  /**
   * Método encargado de validar que el usuario exista, que la contraseña nueva se distinta a la anterior y
   * de setear la nueva contraseña
   * @param {{ email: string, newPassword: string }} recoverData
   * @returns {User} Detalle del usuario recuperado
   */
  static async recover ({ email, newPassword }) {
    const userToRecover = await UserManager.getUser(email);
    if (!userToRecover) throw new InvalidParams(ERROR_DICTIONARY.INVALID_RECOVER_USER);
    if(compareHash(newPassword, userToRecover.password)) throw new InvalidParams(ERROR_DICTIONARY.INVALID_RECOVER_PASSWORD);
    userToRecover.password = createHash(newPassword);
    await userToRecover.save();
    return userToRecover;
  }

  /**
   * Método encargado de enviar un email para recuperar la contraseña.
   * Se genera un token que durara 1h activo.
   * @param {string} email
   * @returns {{ token, sendEmailDetail }}
   */
  static async sendRecoverEmail (email) {
    const userToRecover = await UserManager.getUser(email);
    if (!userToRecover) throw new InvalidParams('El usuario ingresado para recuperar la contraseña es invalido');
    const token = generateToken({ user: userToRecover, expiresIn: config.recoverPasswordTime});
    const recoverPasswordLink = `http://localhost:${config.port}/recover`;
    const sendEmailDetail = MailManager.send({
      to: email,
      subject: 'Recuperacion de contraseña - Ecommers',
      html: `
        <html>
          <h1>Restablecer contraseña</h1>
          <p>Haga click para volver a generar una contraseña.<b><a href="${recoverPasswordLink}" class="myButton">Recuperar Usuario</a></b></p>
        </html>`
    });
    return { token, sendEmailDetail};
  }

  /**
   * Método encargado de cambiar el role. En caso de ser Premium se parara a User y viceversa
   * @param {{ id: string, role: string}} userData
   * @returns {User}
   */
  static async changeRole ({ id, role }) {
    if (![USER_ROLES.PREMIUM, USER_ROLES.USER].includes(role)) throw new InvalidParams(ERROR_DICTIONARY.INVALID_USER_ROLE);
    const newRole = role === USER_ROLES.PREMIUM ? USER_ROLES.USER : USER_ROLES.PREMIUM;
    const userUpdated = await User.updateOne({ _id: id }, {
      $set: {
        role: newRole
      }
    }).exec();
    return userUpdated;
  }

  /**
   * Método encargado de cambiar el role. En caso de ser Premium se parara a User y viceversa
   * @param {{ userId: string, documents: [{ name: string, reference: string }]}} userData
   * @returns { User }
   */
  static async saveDocument ({ userId, documents }) {
    const userToUpdate = await UserManager.findById(userId);
    if (!userToUpdate) throw new InvalidParams(translate(ERROR_DICTIONARY.INVALID_USER_ID, userId));
    if(!userToUpdate.documents?.length) userToUpdate.documents = [];
    const newDocuments = documents.reduce((newDocuments, fileName) => {
      if (userToUpdate.documents.every(document=> document.name !== fileName)) {
        newDocuments.push({ name: fileName, reference: `${baseURL}/documents/${fileName}` });
      }
      return newDocuments;
    },[]);
    userToUpdate.documents = [ ...userToUpdate.documents, ...newDocuments];
    return userToUpdate.save();
  }
}
