import bcrypt from 'bcrypt'

/**
 * Función encargada de hashear una cadena de caracteres
 * @param {*} stringToHash
 * @returns {String}
 */
export const createHash = (stringToHash) => {
  console.log(process.env.SALT);
  return bcrypt.hashSync(stringToHash, bcrypt.genSaltSync(parseInt(process.env.SALT)))
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