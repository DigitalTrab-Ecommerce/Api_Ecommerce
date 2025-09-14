import express from "express";import { prisma } from "../prisma/client.js";
import { sendEmail } from "../services/sendEmail.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { userId, total } = req.body;
  if (!userId || total == null) return res.status(400).json({ error: "Campos obrigatórios: userId, total" });

  try {
    const order = await prisma.order.create({
      data: { userId, total: Number(total) },
      include: { user: true },
    });

    const html = `
      <div style="font-family: Arial, sans-serif; max-width:600px;margin:auto;border-radius:10px;overflow:hidden;border:1px solid #ddd;">
        <div style="background:linear-gradient(90deg,#111,#333);padding:20px;text-align:center;color:#fff;">
          <h1 style="margin:0;">Elite Shoes 👟</h1>
        </div>
        <div style="padding:20px;text-align:center;">
          <h2>Obrigado pela sua compra, ${order.user.name}!</h2>
          <p>Recebemos seu pedido no valor de <b>R$${order.total.toFixed(2)}</b>.</p>
          <a href="https://eliteshoes.com.br/pedidos/${order.id}" style="display:inline-block;margin:20px auto;padding:12px 20px;background:#111;color:#fff;text-decoration:none;border-radius:6px;">Acompanhar meu pedido</a>
        </div>
        <div style="background:#f4f4f4;padding:15px;text-align:center;font-size:14px;color:#555;">
          <p style="margin:0;">© 2025 Elite Shoes</p>
        </div>
      </div>
    `;

    await sendEmail(order.user.email, "Confirmação do seu pedido 🛒", `Olá ${order.user.name}, recebemos seu pedido. Valor: R$${order.total.toFixed(2)}`, html);

    res.json({ message: "Pedido criado e e-mail enviado!", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
});

export default router;