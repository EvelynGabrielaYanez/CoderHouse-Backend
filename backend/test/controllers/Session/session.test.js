import chai from "chai";
import supertest from "supertest";
import { COOKIE_NAME, URL } from "../../utils/constants.js";

const expect = chai.expect
const requester = supertest(URL);

describe('Session Controller', () => {
  const cookie = {};
  describe('Path: /api/session/login - method: POST', () => {
    it('Case: negative - Loggin - incorrect password', async function () {
      const userData = {
        email: 'evelyn.yanez.cursos@gmail.com',
        password: 'evelyn_erronea'
      };
      const result = await (requester.post('/api/session/login').send(userData));
      const cookieResult = result.headers['set-cookie']?.find(cookieString => cookieString.split("=").shift() === COOKIE_NAME);
      expect(cookieResult).to.be.undefined;
    });

    it('Case: negative - Loggin - incorrect email', async function () {
      const userData = {
        email: 'evelyn.yanez.erroneo@gmail.com',
        password: 'evelyn_newPassword'
      };
      const result = await (requester.post('/api/session/login').send(userData));
      const cookieResult = result.headers['set-cookie']?.find(cookieString => cookieString.split("=").shift() === COOKIE_NAME);
      expect(cookieResult).to.be.undefined;
    });

    it('Case: positive - Loggin - Correct user and password', async function () {
      const userData = {
        email: 'evelyn.yanez.cursos@gmail.com',
        password: 'evelyn_newPassword'
      };
      const { headers, _body , statusCode } = await (requester.post('/api/session/login').send(userData));
      expect(statusCode).to.be.equal(200, 'Se esperaba respuesta 200');
      const cookieResult = headers['set-cookie']?.find(cookieString => cookieString.split("=").shift() === COOKIE_NAME);
      expect(cookieResult).to.be.ok;
      const [ name, value ] = cookieResult?.split("=") ?? [];
      cookie.name = name;
      cookie.value = value?.split(';').shift();
      expect(cookie.name).to.be.ok.and.equal(COOKIE_NAME);
      expect(cookie.value).to.be.ok;
      expect(_body.token).to.be.equal(cookie.value);
      expect(_body.userData).to.be.ok;
      expect(_body.userData.email).to.be.equal(userData.email);
    });
  })

  describe('Path: /api/session/current - method: GET', () => {
    it('Case: negative - Current - No user logged in', async function () {
      const { _body, statusCode } = await requester.get('/api/session/current');
      expect(statusCode).to.be.equal(401);
      expect(_body.error).to.be.equal('No auth token');
    });

    it('Case: positive - Current - Logged User', async function () {
      const { _body, statusCode } = await requester.get('/api/session/current').set('Cookie', [`${cookie.name}=${cookie.value}`]);
      expect(statusCode).to.be.equal(200);
      expect(_body.email).to.be.equal('evelyn.yanez.cursos@gmail.com');
    });
  })

  describe('Path: /api/session/logout - method: POST', () => {
    it('Case: negative - Logout - No user logged in', async function () {
      const { _body, statusCode } = await requester.get('/api/session/logout');
      expect(statusCode).to.be.equal(401);
      expect(_body.error).to.be.equal('No auth token');
    });

    it('Case: positive - Logout - Logged User', async function () {
      const { _body, statusCode } = await requester.get('/api/session/logout').set('Cookie', [`${cookie.name}=${cookie.value}`]);
      expect(statusCode).to.be.equal(200);
      expect(_body.message).to.be.equal('Logout con exito');
    });
  })

})