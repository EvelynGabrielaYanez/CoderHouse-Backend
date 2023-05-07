import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema({
  amount: Number,
  purchaser: String
},
{
  createdAt: 'purchase_datetime'
});

const Ticket = mongoose.model('ticket', ticketSchema);

export default Ticket;