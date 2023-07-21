import MockedProducts from "../../dao/models/mockedProducts.js";
import { faker } from '@faker-js/faker';
import logger from "../../utils/logger.js";



export default class MockingManager {
  /**
   * Método encargado de guardar un producto
   * @param {{products: int[]}} newMessageData
   * @returns {}
   */
  async save (newProductData) {
    const newMocking = new MockedProducts(newProductData);
    await MockedProducts.collection.insertOne(newMocking);
    return newMocking;
  }

  async generateAndInsertProducts () {
    const productQty = 100;
    const productList = this.generateRandomProductList(productQty);
    return Promise.all(productList.map(async productData => await this.save(productData)));
  }

  generateRandomProductList(productQty) {
    const products = [];
    while(products.length < productQty) {
      products.push(this.createRandomProduct());
    }
    return products
  }
  createRandomProduct() {
    return {
      title: faker.rawDefinitions.commerce.product_name,
      description: faker.rawDefinitions.commerce.product_description,
      price: faker.number.float(),
      thumbnail: faker.helpers.arrayElement(['image_one.png', 'image_two.png', 'image_three.png']),
      code: faker.string.uuid(),
      stock: faker.number.int(),
      status: faker.datatype.boolean(),
    };
  }

  logTest() {
    logger.debug('Soy un log de consola para desarrollo - No me muestro en producción');
    logger.http('Soy un log de consola para desarrollo - No me muestro en producción');
    logger.info('Soy un log de consola para desarrollo - Y en el archivo ecommers en produccion');
    logger.warning('Soy un log de consola para desarrollo - Y en el archivo ecommers en produccion');
    logger.error('Soy un log de consola para desarrollo - Y en el archivo error e ecommers en produccion');
    logger.fatal('Soy un log de consola para desarrollo - Y en el archivo error e ecommers en produccion');
  }
}