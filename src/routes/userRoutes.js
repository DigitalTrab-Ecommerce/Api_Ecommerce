import express from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma/client.js";
import { sendEmail } from "../services/sendEmail.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ error: "Campos obrigatórios: name, email, password" });

  try {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ error: "E-mail já cadastrado" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    const html = `
      <div style="font-family: Arial, sans-serif; max-width:600px;margin:auto;border-radius:10px;overflow:hidden;border:1px solid #ddd;">
        <div style="background:linear-gradient(90deg,#111,#333);padding:20px;text-align:center;color:#fff">
          <h1 style="margin:0;">Elite Shoes 👟</h1>
          <p style="margin:5px 0 0;font-size:16px;">Performance e estilo para os seus passos</p>
        </div>
        <div style="padding:20px;text-align:center;">
          <h2>Olá, ${user.name}!</h2>
          <p>Seja bem-vindo(a) à <strong>Elite Shoes</strong>, sua loja de sapatos de alta performance.</p>
          <a href="https://eliteshoes.com.br" style="display:inline-block;margin:20px auto;padding:12px 20px;background:#111;color:#fff;text-decoration:none;border-radius:6px;">Explore nossa coleção</a>
        </div>
        <div style="background:#f4f4f4;padding:15px;text-align:center;font-size:14px;color:#555;">
          <p style="margin:0;">© 2025 Elite Shoes</p>
        </div>
      </div>
    `;

    await sendEmail(
      user.email,
      "Bem-vindo à Elite Shoes 👟✨",
      `Olá ${user.name}, seja bem-vindo(a) à Elite Shoes!`,
      html
    );

    const { password: _, ...userSafe } = user;
    res.json({ message: "Usuário cadastrado com sucesso!", user: userSafe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
});

export default router;