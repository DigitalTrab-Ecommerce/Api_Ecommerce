const express = require('express');
require("dotenv").config(); // CHAVE DO SENTRY NO .ENV

const app = express();
app.use(express.json());

const cors = require('cors');
const Sentry = require("@sentry/node"); // REQUIRE DO SENTRY

const port = process.env.PORT || 3001;

app.use(cors());

// INICIANDO O SENTRY SEMPRE ANTES DAS ROTAS
Sentry.init({
  dsn: process.env.SENTRY_DSN,
});
app.use(Sentry.Handlers.requestHandler());

// Rotas principais
const routes = require('./routes/index.routes');
app.use('/api', routes);

// Rota de teste do Sentry
const router = require("express").Router();
router.get("/debug-sentry", (req, res) => {
  throw new Error("Teste de erro no Sentry!");
});
app.use("/test", router);

// Swagger (inserido aqui 🚀)
const setupSwagger = require('./swaggerConfig');
setupSwagger(app);

// Middleware do Sentry para capturar erros
app.use(Sentry.Handlers.errorHandler());

// Middleware genérico de erro
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Ocorreu um erro inesperado!" });
});

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
  console.log(`Documentação Swagger em http://localhost:${port}/docs`);
});
