import { InvalidParams } from "../../../utils/error.js";

export default class Product {
  static lastId = 0;
  id;
  title;
  description;
  price;
  thumbnail;
  code;
  stock;
  constructor (data) {
    this.id = data.id && data.id >= 0 ?  data.id : ++Product.lastId;
    if (this.id > Product.lastId) Product.lastId = this.id;
    this.Title = data.title;
    this.Description = data.description;
    this.Code  = data.code ;
    this.Price = data.price;
    this.Status = data.status;
    this.Stock = data.stock;
    this.Category = data.category;
    this.Thumbnail = data.thumbnail;
  }

  /**
   * Método setter encargado setear el nombre del producto
   */
  set Title (value) {
    if (typeof value !== "string" || !value.length) throw new InvalidParams('El titulo es un parametro obligatorio');
    this.title = value;
  }

  /**
   * Método setter encargado setear la drescripción del producto
   */
  set Description (value) {
    if (typeof value !== "string" || !value.length) throw new InvalidParams('La descripcion es un parametro obligatorio');
    this.description = value;
  }

  /**
   * Método setter encargado setear la drescripción del producto
   */
  set Status (value = true) {
    if (typeof value !== "boolean") throw new InvalidParams('El status es un parametro obligatorio');
    this.status = value;
  }

  /**
   * Método setter encargado setear el precio
   */
  set Price (value) {
    if (typeof value === 'string') value = parseFloat(value);
    if (isNaN(value) && typeof value === 'number') throw new InvalidParams('El precio ingresado es invalido. Parametro obligatorio');
    this.price = value;
  }

  /**
   * Método setter encargado setear las rutas de imagenes
   */
  set Thumbnail (value = []) {
    if (!Array.isArray(value)) throw new InvalidParams('Las rutas de imagenes son invalidas.');
    this.thumbnail = value;
  }

  /**
   * Método setter encargado setear el código identificador
   */
  set Code  (value) {
    if (typeof value !== "string" || !value.length) throw new InvalidParams('El codigo es un parametro obligatorio');
    this.code  = value;
  }

  /**
   * Método setter encargado setear numero de piezas disponibles
   */
  set Stock (value) {
    if (typeof value === 'string') value = parseInt(value);
    if (!Number.isInteger(value)) throw new InvalidParams('El stock ingresado es invalido. Parametro obligatorio');
    this.stock = value;
  }

  /**
   * Método setter encargado setear numero de piezas disponibles
   */
  set Category (value) {
    if (typeof value !== 'string') throw new InvalidParams('Lacategoria ingresada es invalida. Parametro obligatorio');
    this.category = value;
  }

  /**
   * Método get encargado obtener y retornar el id del producto
   */
  get Id () {
    return this.id;
  }

  /**
   * Método get encargado obtener y retornar el nombre del producto
   */
  get Title () {
    return this.title;
  }

  /**
   * Método get encargado obtener y retornar la drescripción del producto
   */
  get Description () {
    return this.description;
  }

  /**
   * Método get encargado obtener y retornar el precio
   */
  get Price () {
    return this.price;
  }

  /**
   * Método get encargado obtener y retornar la ruta de imagen
   */
  get Thumbnail () {
    return this.thumbnail;
  }

  /**
   * Método get encargado obtener y retornar el código identificador
   */
  get Code  () {
    return this.code;
  }

  /**
   * Método get encargado obtener y retornar el numero de piezas disponibles
   */
  get Stock () {
    return this.stock;
  }

  /**
   * Método get encargado obtener y retornar el status
   */
  get Status () {
    return this.status;
  }

  /**
   * Método get encargado obtener y retornar la categoria
   */
  get Category () {
    return this.category;
  }

  toString () {
    return `- id: ${this.Id}\n- Code: ${this.Code}\n- Titulo: ${this.Title} \n- Ruta de la miniatura: ${this.Thumbnail}\n- Descripcion: ${this.Description}\n- Price: ${this.Price}\n- Stock: ${this.Stock}`;
  }
}
