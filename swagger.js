const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Farm Funding API',
      version: '1.0.0',
      description: '농사 펀딩 인증 API 명세서',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.join(__dirname, './routes/*.js')],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
