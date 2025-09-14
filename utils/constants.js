const Ecommerce_confirmation_template = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmação de Pedido</title>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
        }
        .container {
            max-width: 650px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #000000;
            color: #ffffff;
            padding: 25px;
            text-align: center;
        }
        .logo {
            font-size: 26px;
            font-weight: bold;
            margin-bottom: 10px;
            letter-spacing: 2px;
        }
        .content {
            padding: 30px;
        }
        .footer {
            background-color: #f1f1f1;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666666;
        }
        .confirmation-badge {
            background-color: #fafafa;
            border: 2px solid #000000;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
        }
        .divider {
            border-top: 1px solid #eeeeee;
            margin: 25px 0;
        }
        .info-item {
            margin-bottom: 12px;
        }
        .info-label {
            font-weight: bold;
            color: #000000;
        }
        .product {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
        }
        .product img {
            width: 80px;
            border-radius: 6px;
            margin-right: 15px;
        }
        .product-details {
            flex: 1;
        }
        .product-details h4 {
            margin: 0;
            font-size: 15px;
            color: #000000;
        }
        .product-details p {
            margin: 3px 0;
            font-size: 13px;
            color: #555;
        }
        .total {
            text-align: right;
            font-size: 18px;
            font-weight: bold;
            margin-top: 10px;
        }
        .contact-info {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 6px;
            margin-top: 20px;
        }
        @media only screen and (max-width: 600px) {
            .container {
                width: 95%;
                margin: 10px auto;
            }
            .content {
                padding: 20px;
            }
            .product {
                flex-direction: column;
                align-items: flex-start;
            }
            .product img {
                margin-bottom: 10px;
            }
        }
    </style>
</head>
<body>
    <center>
        <div class="container">
            <!-- Cabeçalho -->
            <div class="header">
                <div class="logo">NIKE STORE</div>
                <h1>Obrigado pela sua compra!</h1>
            </div>
            
            <!-- Conteúdo -->
            <div class="content">
                <p>Olá <strong>Comprador X</strong>,</p>
                
                <p>Recebemos seu pedido e ele já está sendo processado. Você receberá uma notificação assim que for enviado.</p>
                
                <div class="confirmation-badge">
                    <h2 style="margin-top: 0;">📦 Pedido Confirmado</h2>
                    <p>Nº do pedido: <strong>#NK-20230901</strong></p>
                </div>
                
                <h3 style="color: #000;">Detalhes do Pedido</h3>

                <!-- Produto 1 -->
                <div class="product">
                    <img src="https://static.nike.com/a/images/t_prod/w_960,c_limit,f_auto/air-force-1.png" alt="Nike Air Force 1">
                    <div class="product-details">
                        <h4>Nike Air Force 1</h4>
                        <p>Tamanho: 42</p>
                        <p>Quantidade: 1</p>
                        <p>Preço: R$ 699,90</p>
                    </div>
                </div>

                <!-- Produto 2 -->
                <div class="product">
                    <img src="https://static.nike.com/a/images/t_prod/w_960,c_limit,f_auto/camisa-nike-dri-fit.png" alt="Camisa Nike Dri-FIT">
                    <div class="product-details">
                        <h4>Camisa Nike Dri-FIT</h4>
                        <p>Tamanho: M</p>
                        <p>Quantidade: 2</p>
                        <p>Preço: R$ 149,90 cada</p>
                    </div>
                </div>

                <div class="total">Total: R$ 999,70</div>

                <div class="divider"></div>

                <h3 style="color: #000;">Endereço de Entrega</h3>
                <p>Rua das Palmeiras, 123 - Fortaleza, CE</p>
                <p>CEP: 60000-000</p>

                <div class="contact-info">
                    <h3 style="color: #000; margin-top: 0;">Precisa de ajuda?</h3>
                    <p>WhatsApp: <strong>(85) 99999-0000</strong></p>
                    <p>E-mail: <strong>suporte@nike.com</strong></p>
                </div>
                
                <p>Atenciosamente,<br>
                <strong>Equipe Nike</strong></p>
            </div>
            
            <!-- Rodapé -->
            <div class="footer">
                <p>© 2023 Nike Store. Todos os direitos reservados.</p>
                <p>Você está recebendo este e-mail porque realizou uma compra em nossa loja online.</p>
            </div>
        </div>
    </center>
</body>
</html>`

module.exports = {
    Ecommerce_confirmation_template
}