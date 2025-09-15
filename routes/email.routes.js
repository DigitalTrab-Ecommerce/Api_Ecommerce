const express = require("express");
const { PrismaClient } = require("../generated/prisma");
const sendEmail = require("../services/sendMail");

const emailRouter = express.Router();
const prisma = new PrismaClient();

emailRouter.post("/send", async (req, res) => {
  const { to, subject, text, html } = req.body;
  if (!to || !subject || !text) {
    return res
      .status(400)
      .json({ error: "Campos obrigatórios: to, subject, text" });
  }

  try {
    await sendEmail(to, subject, text, html);
    res.json({ message: "E-mail enviado com sucesso!" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao enviar e-mail", details: err.message });
  }
});

emailRouter.get("/logs", async (req, res) => {
  try {
    const logs = await prisma.emailLog.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar logs", details: err.message });
  }
});

module.exports = emailRouter;
