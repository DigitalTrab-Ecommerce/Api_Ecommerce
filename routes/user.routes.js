const express = require("express");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("../generated/prisma");
const sendEmail = require("../services/sendMail");
const emailRouter = require("./email.routes");

const userRouter = express.Router();
const prisma = new PrismaClient();

/**
 * @openapi
 * /users/register:
 *   post:
 *     summary: Registro de novo usuário
 *     description: Cria um novo usuário, salva no banco de dados com senha criptografada e envia e-mail de boas-vindas.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: João da Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: minhaSenha123
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário cadastrado com sucesso!
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Campos obrigatórios faltando ou e-mail já cadastrado
 *       500:
 *         description: Erro ao cadastrar usuário
 */
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Campos obrigatórios: name, email, password" });
  }

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

module.exports = userRouter;
