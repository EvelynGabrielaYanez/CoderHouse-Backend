import bcrypt from 'bcrypt';
import env from '../configuration/config.js';

/**
 * Función encargada de hashear una cadena de caracteres
 * @param {*} stringToHash
 * @returns {String}
 */
export const createHash = (stringToHash) => {
  console.log(stringToHash);
  return bcrypt.hashSync(stringToHash, bcrypt.genSaltSync(parseInt(env.salt)))
};

/**
 * Función encargada de comparar una cadena de caracteres con otra cadena de caracteres hasheada
 * @param {*} stringToCompare
 * @param {*} hashStringToCompare
 * @returns {String}
 */
export const compareHash = (stringToCompare, hashStringToCompare) => {
  return bcrypt.compareSync(stringToCompare, hashStringToCompare)
};