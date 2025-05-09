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
            owner: {
              type: 'object',
              properties: {
                _id: { type: 'string', example: '664b22a9c72f3c8d215a9bdf' },
                name: { type: 'string', example: '홍길동' }
              }
            },
            title: { type: 'string', example: '도시 속의 텃밭 프로젝트' },
            description: { type: 'string', example: '버려진 옥상에서 상추 키우기' },
            teamRecruit: {
              type: 'object',
              description: '역할별 모집 인원',
              example: { 브랜딩: 2, 일꾼: 3, 펀딩자: 1 },
              additionalProperties: { type: 'integer' }
            },
            teamCurrent: {
              type: 'object',
              description: '역할별 현재 인원',
              example: { 브랜딩: 1, 일꾼: 0, 펀딩자: 0 },
              additionalProperties: { type: 'integer' }
            },
            teamMembers: {
              type: 'object',
              description: '역할별 참여자 리스트',
              example: {
                브랜딩: [
                  { _id: 'userId123', name: '김참여' }
                ]
              },
              additionalProperties: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' }
                  }
                }
              }
            },
            currentFund: { type: 'number', example: 150000 },
            participantCount: { type: 'number', example: 3 },
            createdAt: { type: 'string', format: 'date-time', example: '2024-05-10T13:37:42.000Z' }
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
