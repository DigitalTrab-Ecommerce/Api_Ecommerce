import express from "express";
import { prisma } from "../prisma/client.js";
import { sendEmail } from "./services/sendEmail.js";

const router = express.Router();

router.post("/send", async (req, res) => {
  const { to, subject, text, html } = req.body;
  if (!to || !subject || !text) return res.status(400).json({ error: "Campos obrigatórios: to, subject, text" });

  try {
    await sendEmail(to, subject, text, html);
    res.json({ message: "E-mail enviado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao enviar e-mail", details: err.message });
  }
});

router.get("/logs", async (req, res) => {
  const logs = await prisma.emailLog.findMany({ orderBy: { createdAt: "desc" } });
  res.json(logs);
});

export default router;