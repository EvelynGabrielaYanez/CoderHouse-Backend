
import Message from '../../dao/models/message.js'

export default class MessageManager {
  /**
   * Método encargado de retornar el listado de mensajes
   * @returns {}
   */
  async getMessages () {
    return Message.find().exec();
  }

  /**
   * Método encargado de guardar el mensaje pasado por parametro
   * @param {{products: int[]}} newMessageData
   * @returns {}
   */
  async save (newMessageData) {
    const newMessage = new Message(newMessageData);
    await Message.collection.insertOne(newMessage);
    return newMessage;
  }
}