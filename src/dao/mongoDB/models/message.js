import mongoose, { Schema } from "mongoose";

const MessageModel = mongoose.model("Message", new Schema({
  user: String,
  message: String
}));

export default class Message extends MessageModel {
  constructor (data) {
    super(data);
  }
}
