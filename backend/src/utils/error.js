import logger from "./logger.js";

const EnumErrors = {
  INVALID_PARAMS: 400,
  BUSINESS_ERROR: 400,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}

export const errorHandler = ({ error, res }) => {
  if (error instanceof CustomError) {
    logger.error(JSON.stringify({ error: error.message, status: error.httpErrorCode, stack: error.stack }));
    return res.status(error.httpErrorCode).json({ error: error.message, status: error.httpErrorCode });
  }
  logger.error(JSON.stringify({ error: error.message, status: EnumErrors.INTERNAL_SERVER_ERROR, stack: error.stack }));
  res.status(EnumErrors.INTERNAL_SERVER_ERROR).json({ error: error.message, status: error.httpErrorCode });
}

export class CustomError extends Error {
  constructor (message = 'Error', httpErrorCode) {
    super (message);
    this.httpErrorCode = httpErrorCode ?? EnumErrors.INTERNAL_SERVER_ERROR;
  }
}

export class BadRequest extends CustomError {
  constructor (message = 'Bad Request') {
    super (message, EnumErrors.BAD_REQUEST);
  }
}

export class NotFound extends CustomError {
  constructor (message = 'Not Found') {
    super (message, EnumErrors.NOT_FOUND);
  }
}

export class InvalidParams extends CustomError {
  constructor (message = 'Invalid Params') {
    super (message, EnumErrors.INVALID_PARAMS);
  }
}

export class Unauthorized extends CustomError {
  constructor (message = 'Unauthorized') {
    super(message, EnumErrors.UNAUTHORIZED);
  }
}

export const ERROR_DICTIONARY = {
  INVALID_PARAMS: 'Parametros invalidos',
  PRODUCT_ALREDY_LOADED: 'El producto code: {0} ya se encuentra cargado',
  INVALID_SESSION: 'Sesión invalida',
  NO_SESSION: 'No hay ninguna sesión',
  ALREDY_REGISTERED: 'El usuario {0} ya se encuentra registardo',
  CART_DOESNT_EXIT: 'El carrito de id {0} no existe',
  USER_ALREADY_EXIST: 'El usuario ya existe',
  USER_NOT_FOUND: 'User no encontrado',
  ERROR_GETTING_TOKEN: 'Error en consulta de token',
  INVALID_CREDENTIALS: 'Credenciales no válidas',
  INVALID_PASSWORD: 'Contraseña no valida',
  UNAUTHORIZED_USER: 'Usuario no autorizado',
  INVALID_USER_ID: 'El id ingresado {0} no corresponde a un id que se encuentre registrado',
  INVALID_PRODUCT_ID: 'El id de producto {0} no se encuentra registrado',
  CREATE_USER_INVALID_PARAMS: 'Parametro invalidos. El usuario posee los siguientes parametros como obligatorios\n - Nombre: Debe ser un string {0} \n - Apellido: Debe ser un string {1}\n - email: Debe ser un string {2} \n - Edad: Debe ser un numero entero, {3}\n - Contraseña: Debe ser un string',
  NO_USER_PRODUCTS: 'El usuario {0} no es dueño del producto {1}',
  INVALID_RECOVER_USER: 'El usuario ingresado para recuperar la contraseña es invalido',
  INVALID_RECOVER_PASSWORD: 'La nueva contraseña debe ser distinta a la anterior',
  INVALID_USER_ROLE: 'Rol de usuario invalido',
  INVALID_PRODUCT: 'El producto no se encuentra en registrado. Id: {0}',
  PRODUCT_OWNER_CART_ADD: 'No es posible agregar productos si es el dueño. Dueño: {0} - Producto: {1}',
  INVALID_CART: 'El carro no se encuentra en registrado. Id: {0}',
  INVALID_CART_OR_PRODUCT: 'El carro no se encuentra registrado o el producto no se encuentra en el carro. Id del carro: {0}. Id del producto: {1}'
}