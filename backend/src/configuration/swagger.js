import swaggerJsdoc from 'swagger-jsdoc';
//import productsSwagger from '../'

const options = {
  definition: {
    failOnErrors: true,
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce-EGY',
      descrition: 'Ecommerce coderhouce API',
      version: '1.0.0',
    },
  },
  apis: [`./src/docs/*.yaml`],
};

export default swaggerJsdoc(options);