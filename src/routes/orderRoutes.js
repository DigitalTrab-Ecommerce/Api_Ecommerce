await sendEmail(
  order.user.email,
  "Confirmação do seu pedido na Elite Shoes",
  `Olá ${order.user.name}, recebemos seu pedido de R$${order.total.toFixed(2)}`,
  "orderConfirmation",
  { name: order.user.name, total: order.total.toFixed(2), orderId: order.id }
);