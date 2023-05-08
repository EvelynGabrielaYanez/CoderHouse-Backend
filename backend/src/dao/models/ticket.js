import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema({
  amount: Number,
  purchaser: String
},
{
  timestamps: { createdAt: 'purchaseDatetime', updatedAt: false },
  versionKey: false
});

const Ticket = mongoose.model('ticket', ticketSchema);

export default Ticket;