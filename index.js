
const express = require('express');
const cors = require('cors')
const Sentry = require("@sentry/node");// REQUIRE DO SENTRY
require("dotenv").config(); // CHAVE DO SENTRY NO .ENV
const port = 3001;

const app = express();

app.use(express.json());
app.use(cors());

// INICIANDO O SENTRY SEMPRE ANTES DAS ROTAS
Sentry.init({
  dsn: process.env.SENTRY_DSN,
});
app.use(Sentry.Handlers.requestHandler());

const routes = require('./routes/index.routes')
app.use('/api', routes);

// Rota de teste do Sentry
const router = require("express").Router();
router.get("/debug-sentry", (req, res) => {
  throw new Error("Teste de erro no Sentry!");
});
app.use("/test", router);

app.use(Sentry.Handlers.errorHandler());

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Ocorreu um erro inesperado!" });
});


const PORT = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})