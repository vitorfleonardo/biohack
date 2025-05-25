const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Agenda API',
      version: '1.0.0',
      description: 'API para gerenciar eventos e medicamentos na agenda',
    },
    servers: [
      {
        url: 'https://biohack.onrender.com',
        description: 'Servidor Render - Produção',
      },
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
