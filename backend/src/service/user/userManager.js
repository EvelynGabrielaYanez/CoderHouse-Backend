import config from "../../configuration/config.js";
import User from "../../dao/models/user.js";
import { createHash } from "../../utils/bcrypt.js";
import { BadRequest, ERROR_DICTIONARY, InvalidParams } from "../../utils/error.js";
import { generateToken } from "../../utils/jwt.js";
import { translate } from "../../utils/string.js";
import CartsManager from "../carts/cartsManager.js";
import MailManager from "../mail/mailManager.js";

/**
 * Clase encargada de manejar la logica de negocio e interactuar con el modelo user de la base de datos
 */
export default class UserManager {
  static async create ({ email, firstName, lastName, age, role, password }) {
    const user = await UserManager.getUser(email);
    if (user) throw new InvalidParams(ERROR_DICTIONARY.USER_ALREADY_EXIST);
    const cart = await (new CartsManager()).save();
    return await User.create({ email, firstName, lastName, age, role, cart: cart._id, password: createHash(password) });
  }

  static async getUser(email) {
    return User.findOne({ email }).populate('cart').exec();
  }

  static async findById(id) {
   return User.findById(id).exec();
  }

  static async register({ email, firstName, lastName, age, password }) {
    const user = await UserManager.getUser(email);
    if (user) {
      throw new BadRequest(translate(ERROR_DICTIONARY.ALREDY_REGISTERED, email));
    }
    const newUser = await UserManager.create({ firstName, lastName, email, age, password });
    const token = generateToken(newUser);
    return { user: newUser, token};
  }

  static async recover ({ email, newPassword }) {
    const userToRecover = await UserManager.getUser(email);
    if (!userToRecover) throw new InvalidParams('El usuario ingresado para recuperar la contraseña es invalido');
    
    const contra = createHash(newPassword);;
    console.log(contra);
    console.debug(newPassword);
    userToRecover.password = createHash(newPassword);
    await userToRecover.save();
    return userToRecover;
  }

  static async sendRecoverEmail (email) {
    const userToRecover = await UserManager.getUser(email);
    console.log(userToRecover);
    if (!userToRecover) throw new InvalidParams('El usuario ingresado para recuperar la contraseña es invalido');
    const token = generateToken(userToRecover, config.recoverPasswordTime);
    const recoverPasswordLink = `http://localhost:${config.port}/recover`;
    const sendEmailDetail = MailManager.send({
      to: email,
      subject: 'No responder este mensaje. Fue generado de manera automatica', // TODO ver por que no se ve en el mail
      html: `
        <html>
          <h1>Restablecer contraseña</h1>
          <p>Haga click para volver a generar una contraseña.<b><a href="${recoverPasswordLink}" class="myButton">Recuperar Usuario</a></b></p>
        </html>`
    });
    return { token, sendEmailDetail};
  }
}
