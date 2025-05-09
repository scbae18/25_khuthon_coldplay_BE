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
      schemas: {
        Project: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '664b2380c72f3c8d215a9be2' },
            owner: { type: 'string', example: '664b22a9c72f3c8d215a9bdf' },
            title: { type: 'string', example: '도시 속의 텃밭 프로젝트' },
            description: { type: 'string', example: '버려진 옥상에서 상추 키우기' },
            teamType: { type: 'string', example: '브랜딩형' },
            currentFund: { type: 'number', example: 150000 },
            participantCount: { type: 'number', example: 3 },
            createdAt: { type: 'string', example: '2024-05-10T13:37:42.000Z' }
          }
        }
      }
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
