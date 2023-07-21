import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  message: String
});

messageSchema.pre('find', function() {
  this.populate('sender');
});

const MessageModel = mongoose.model("message", messageSchema);

export default class Message extends MessageModel {
  constructor (data) {
    super(data);
  }
}
