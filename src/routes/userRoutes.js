await sendEmail(
  user.email,
  "Bem-vindo à Elite Shoes",
  `Olá ${user.name}, seja bem-vindo(a)!`,
  "welcome",
  { name: user.name }
);