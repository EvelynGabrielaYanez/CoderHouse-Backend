import chai from "chai";
import supertest from "supertest";
import { COOKIE_NAME, URL } from "../../utils/constants.js";

const expect = chai.expect
const requester = supertest(URL);

describe('Product Controller', () => {
  const cookie = {};
  const userData = {};
  let productToDelete = '';
  before(async function () {
    const userInfo = {
      email: 'admin@admin.com',
      password: 'admin'
    };
    const { headers, _body: { userData: { _id, cart } } } = await (requester.post('/api/session/login').send(userInfo));
    const cookieResult = headers['set-cookie']?.find(cookieString => cookieString.split("=").shift() === COOKIE_NAME);
    const [ name, value ] = cookieResult?.split("=") ?? [];
    cookie.name = name;
    cookie.value = value?.split(';').shift();
    userData.id = _id;
    userData.cartId = cart._id;
  });

  describe('Path: /api/products - method: GET', () => {
    it('Case: negative - Products - Unauthorized', async function () {
      const { _body, statusCode } = await (requester.get('/api/products').send());
      expect(statusCode).to.be.equal(401);
      expect(_body.error).to.be.equal('No auth token');
    });

    it('Case: positive - Products - get products', async function () {
      const { _body, statusCode} = await (requester.get('/api/products').set('Cookie', [`${cookie.name}=${cookie.value}`]).send());
      expect(statusCode).to.be.equal(200);
      expect(_body.totalDocs).to.be.ok;
      expect(Array.isArray(_body.payload)).to.be.ok;
    });
  })

  describe('Path: /api/products - method: POST', () => {
    it('Case: negative - Products - Unauthorized', async function () {
      const { _body, statusCode } = await (requester.get('/api/products').send());
      expect(statusCode).to.be.equal(401);
      expect(_body.error).to.be.equal('No auth token');
    });

    it('Case: positive - Products - get products', async function () {
      const { _body, statusCode} = await (requester.get('/api/products').set('Cookie', [`${cookie.name}=${cookie.value}`]).send());
      expect(statusCode).to.be.equal(200);
      expect(_body.totalDocs).to.be.ok;
      expect(Array.isArray(_body.payload)).to.be.ok;
    });
  })

  describe('Path: /api/products - method: POST - saveProducts', () => {
    it('Case: negative - Products - Unauthorized', async function () {
      const { _body, statusCode } = await (requester.post('/api/products').send());
      expect(statusCode).to.be.equal(401);
      expect(_body.error).to.be.equal('No auth token');
    });

    it('Case: positive - Products - save products', async function () {
      const productData = {
        title: 'Prueba Nuevo Proudcto - Test',
        description: 'Insertando producto al carro desde los test',
        code: '666666',
        price: 10009.55,
        stock: 500,
        category: 'PERRO'
      };
      const { _body, statusCode} = await (requester.post('/api/products')
                                                    .set('Cookie', [`${cookie.name}=${cookie.value}`])
                                                    .field('title', productData.title)
                                                    .field('description', productData.description)
                                                    .field('code', productData.code)
                                                    .field('price', productData.price)
                                                    .field('stock', productData.stock)
                                                    .field('category', productData.category));
      const { title, description, price, thumbnail, code, stock, status, category, _id} = _body;
      productToDelete = _id
      expect(statusCode).to.be.equal(200, `Respuesta inesperada ${JSON.stringify(_body)}`);
      expect(title).to.be.equal(productData.title);
      expect(description).to.be.equal(productData.description);
      expect(price).to.be.equal(productData.price);
      expect(thumbnail).to.be.deep.equal([]);
      expect(code).to.be.equal(productData.code);
      expect(stock).to.be.equal(productData.stock);
      expect(status).to.be.equal(1);
      expect(category).to.be.equal(productData.category);
      expect(_id).to.be.ok;

    });

    it('Case: negative - Products - Product alredy loaded', async function () {
      const productData = {
        titie: 'Prueba Nuevo Proudcto - Test',
        description: 'Insertando producto al carro desde los test',
        code: '666666',
        price: 10009.55,
        stock: 500,
        category: 'PERRO'
      };
      const { _body, statusCode,} = await (requester.post('/api/products')
                                                    .set('Cookie', [`${cookie.name}=${cookie.value}`])
                                                    .field('title', productData.titie)
                                                    .field('description', productData.description)
                                                    .field('code', productData.code)
                                                    .field('price', productData.price)
                                                    .field('stock', productData.stock)
                                                    .field('category', productData.category));
      expect(statusCode).to.be.equal(400, `Respuesta inesperada ${JSON.stringify(_body)}`);
      expect(_body.error).to.be.equal(`El producto code: ${productData.code} ya se encuentra cargado`);
      expect(_body.status).to.be.equal(400);
    });
  })

  describe('Path: /api/products/:{productId} - method: DELETE - deleteProduct', () => {
    it('Case: negative - Products - Unauthorized', async function () {
      const { _body, statusCode } = await (requester.delete('/api/products').send());
      expect(statusCode).to.be.equal(401);
      expect(_body.error).to.be.equal('No auth token');
    });

    it('Case: positive - Products - deleted product', async function () {
      const { _body, statusCode } = await (requester.delete(`/api/products/${productToDelete}`)
                                                    .set('Cookie', [`${cookie.name}=${cookie.value}`]));
      expect(statusCode).to.be.equal(200, `Respuesta inesperada ${JSON.stringify(_body)}`);
      expect(_body.deletedCount).to.be.equal(1);
    });
  })
})