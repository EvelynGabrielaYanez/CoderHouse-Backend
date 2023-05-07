import Ticket from "../../dao/models/ticket.js";

/**
 * Clase encargada de manejar la logica de negocio
 */
export default class TicketManager {
  static async create (products) {
    const ticketData = {
      amount: products.reduce((total, product)=> {
        total += product.price
        return total;
      }, 0)
    }
    const ticket = new Ticket(ticketData);
    await Ticket.collection.insertOne(ticket);
    return ticket;
  }
}
