import Ticket from "../../dao/models/ticket.js";

/**
 * Clase encargada de manejar la logica de negocio
 */
export default class TicketManager {
  static async create (products, purchaser) {
    const ticketData = {
      amount: products.reduce((total, product)=> {
        total += product.price
        return total;
      }, 0),
      purchaser
    }
    const ticket = new Ticket(ticketData);
    await ticket.save();;
    return ticket;
  }
}
