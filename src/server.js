const express = require('express');
const app = express();
const eventRoutes = require('./routes/eventRoutes');
const medicationRoutes = require('./routes/medicationRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rotas da API
app.use('/api/events', eventRoutes);
app.use('/api/medications', medicationRoutes);

// Rota da documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicializa servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Documentação Swagger em http://localhost:${PORT}/api-docs`);
});

app.get('/', (req, res) => {
  res.send(
    'API Biohack está rodando 🚀 Acesse /api-docs para ver a documentação'
  );
});
