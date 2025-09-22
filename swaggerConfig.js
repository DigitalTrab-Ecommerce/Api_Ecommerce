// swaggerConfig.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Api Ecommerce DigitalTrab',
      version: '1.0.0',
      description: 'Documentação da API Ecommerce do projeto DigitalTrab',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3001}`,
        description: 'Servidor Local'
      }
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Camiseta' },
            price: { type: 'number', example: 49.9 }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            username: { type: 'string', example: 'usuario_teste' },
            email: { type: 'string', example: 'teste@email.com' }
          }
        }
      }
    }
  },
  // Ajuste os caminhos conforme a estrutura do seu projeto
  apis: ['./routes/*.js', './controllers/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
