import mongoose from "mongoose";

export class ManagerMongoDB {
  #url
  constructor(collection, model) {
    this.#url = process.env.DB_URL;
    this.collection = collection;
    this.schema = model.schema;
    this.model = model;
  }
  async #setConnection() {
    await mongoose.connect(this.#url);
  }
  async addElements(elements) {
    this.#setConnection();
    return await this.model.insertMany(elements);
  }
  async getElements() {
    this.#setConnection();
    return this.model.find();
  }
  async getElementById(id) {
    this.#setConnection();
    return this.model.findById(id);
  }
  async updateElement(id, info) {
    this.#setConnection()
    return this.model.findByIdAndUpdate(id, info);
  }
  async deleteElement(id) {
    this.#setConnection();
    return this.model.findByIdAndDelete(id);
  }
}