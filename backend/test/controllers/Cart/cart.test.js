import chai from "chai";
import supertest from "supertest";
import { COOKIE_NAME, URL } from "../../utils/constants.js";

const expect = chai.expect
const requester = supertest(URL);

describe('Carts Controller', () => {
  const cookie = {};
  const cookieAdmin = {};
  const userData = {};
  let productTestId = null;
  before(async function () {
    // Se loguea el usuario para setear la cookie
    const userInfo = {
      email: 'evelyn.yanez.cursos@gmail.com',
      password: 'evelyn_newPassword'
    };
    const { headers, _body } = await (requester.post('/api/session/login').send(userInfo));
    const cookieResult = headers['set-cookie']?.find(cookieString => cookieString.split("=").shift() === COOKIE_NAME);
    const [ name, value ] = cookieResult?.split("=") ?? [];
    cookie.name = name;
    cookie.value = value?.split(';').shift();
    userData.id = _body.userData._id;
    userData.cartId = _body.userData.cart._id;

    // Se loguea el usuario admin para crear el producto
    const adminResponse = await (requester.post('/api/session/login')
                                                .send({
                                                        email: 'admin@admin.com',
                                                        password: 'admin'
                                                      }));
    const adminCookieResult = adminResponse.headers['set-cookie']?.find(cookieString => cookieString.split("=").shift() === COOKIE_NAME);
    let [ adminCookieName, adminCookieValue ] = adminCookieResult?.split("=") ?? [];
    cookieAdmin.name = adminCookieName;
    cookieAdmin.value = adminCookieValue?.split(';').shift();

    // Se crea un producto para agregar
    const productData = {
      title: 'Prueba Nuevo Proudcto - Test',
      description: 'Insertando producto al carro desde los test',
      code: '666666',
      price: 10009.55,
      stock: 500,
      category: 'PERRO'
    };
    const { _body: body } = await (requester.post('/api/products')
                                                .set('Cookie', [`${cookieAdmin.name}=${cookieAdmin.value}`])
                                                .field('title', productData.title)
                                                .field('description', productData.description)
                                                .field('code', productData.code)
                                                .field('price', productData.price)
                                                .field('stock', productData.stock)
                                                .field('category', productData.category));
    productTestId = body._id;
  });

  after(async function () {
    // Se elimina el producto creado para realizar las pruebas
    await (requester.delete(`/api/products/${productTestId}`)
                    .set('Cookie', [`${cookieAdmin.name}=${cookieAdmin.value}`]));
  });

  describe('Path: /api/carts/:{cartId} - method: GET', () => {
    it('Case: negative - Carts - Unauthorized', async function () {
      const { _body, statusCode } = await (requester.get(`/api/carts/${userData.cartId}`));
      expect(statusCode).to.be.equal(401, JSON.stringify(_body));
      expect(_body.error).to.be.equal('No auth token');
    });

    it('Case: positive - Carts - get user cart', async function () {
      const { _body, statusCode} = await (requester.get(`/api/carts/${userData.cartId}`).set('Cookie', [`${cookie.name}=${cookie.value}`]).send());
      expect(statusCode).to.be.equal(200, JSON.stringify(_body));
      expect(_body._id).to.be.equal(userData.cartId);
      expect(Array.isArray(_body.products)).to.be.ok;
    });
  })

  describe('Path: /api/carts/:{cartId}/product/:{productId} - method: POST', () => {
    it('Case: negative - Carts - Unauthorized', async function () {
      const { _body, statusCode } = await (requester.post(`/api/carts/${userData.cartId}/product/${productTestId}`));
      expect(statusCode).to.be.equal(401, JSON.stringify(_body));
      expect(_body.error).to.be.equal('No auth token');
    });

    it('Case: positive - Carts - add new product to cart', async function () {
      const { _body, statusCode} = await (requester.post(`/api/carts/${userData.cartId}/product/${productTestId}`)
                                                    .set('Cookie', [`${cookie.name}=${cookie.value}`]));
      expect(statusCode).to.be.equal(200, JSON.stringify(_body));
      expect(_body._id).to.be.equal(userData.cartId);
      expect(Array.isArray(_body.products)).to.be.ok;
      expect(_body.products.length).to.be.greaterThan(0);
      const productInCar = _body.products.find(({ product }) => product._id === productTestId);
      expect(productInCar).to.be.ok;
      expect(productInCar.quantity).to.be.equal(1);
    });

    it('Case: positive - Carts - add existing product to cart', async function () {
      const { _body, statusCode} = await (requester.post(`/api/carts/${userData.cartId}/product/${productTestId}`)
                                                    .set('Cookie', [`${cookie.name}=${cookie.value}`]));
      expect(statusCode).to.be.equal(200, JSON.stringify(_body));
      expect(_body._id).to.be.equal(userData.cartId);
      expect(Array.isArray(_body.products)).to.be.ok;
      expect(_body.products.length).to.be.greaterThan(0);
      const productInCar = _body.products.find(({ product }) => product._id === productTestId);
      expect(productInCar).to.be.ok;
      expect(productInCar.quantity).to.be.equal(2);
    });
  })

  describe('Path: /api/carts/:{cartId} - method: DELETE', () => {
    it('Case: negative - Carts - Unauthorized', async function () {
      const { _body, statusCode } = await (requester.delete(`/api/carts/${userData.cartId}/product/${productTestId}`));
      expect(statusCode).to.be.equal(401, JSON.stringify(_body));
      expect(_body.error).to.be.equal('No auth token');
    });

    it('Case: positive - Carts - delete all products in cart', async function () {
      const { _body, statusCode} = await (requester.delete(`/api/carts/${userData.cartId}`)
                                                    .set('Cookie', [`${cookie.name}=${cookie.value}`]));
      expect(statusCode).to.be.equal(200, JSON.stringify(_body));
      expect(_body._id).to.be.equal(userData.cartId);
      expect(_body.products).to.be.deep.equal([]);
    });
  })
})