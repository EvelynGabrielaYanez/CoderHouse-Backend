import { Schema } from "mongoose";

const MessageModel = mongoose.model("Message", new Schema({
  user: {
      type: String,
      unique: true
  },
  message: String
}));

export default class Message extends MessageModel {
  constructor (data) {
    super(data);
  }
}