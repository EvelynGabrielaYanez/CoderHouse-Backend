import MockingManager from "../../service/mocking/mockingController.js";

/**
 * Clase encargada de manejar la captura de errores, validar
 */
export default class MockingHttpManager {
  static async insertProducts (req, res, next) {
    try {
      const response = await (new MockingManager()).generateAndInsertProducts();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
 }
 static async logTest(req, res, next) {
  try {
    await (new MockingManager()).logTest();
    const response = { message: 'Log realizado con éxito' };
    req.logger.http(response);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
 }
}