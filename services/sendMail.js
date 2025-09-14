const nodemailer = require("nodemailer");
const { prisma } = require("../prisma/client");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(to, subject, text, html) {
  try {
    const info = await transporter.sendMail({
      from: `"Elite Shoes" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    await prisma.emailLog.create({
      data: { to, subject, text, html, status: "success" },
    });

    console.log("Email enviado:", info.messageId);
    return info;
  } catch (err) {
    await prisma.emailLog.create({
      data: { to, subject, text, html, status: "error" },
    });
    console.error("Erro ao enviar email:", err);
    throw err;
  }
}

module.exports = sendEmail;