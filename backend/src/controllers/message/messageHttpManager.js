import MessageManager from "../../service/message/messageManager.js";

/**
 * Clase encargada de manejar la captura de errores, validar
 */
export default class MessageHttpManager {
  /**
   * Obtiene el listado de productos correpsondientes a un carrito
   * @param {*} req
   * @param {*} res
   */
  static async getMessage (req, res) {
    try {
      const response = await (new MessageManager().getMessages());
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }

  static async save (req, res) {
    try {
      const { message } = req.body;
      const { _id } = req.user;
      const response = await (new MessageManager().save({ sender: _id, message }));
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error.message, stack: error.stack} );
    }
  }
}