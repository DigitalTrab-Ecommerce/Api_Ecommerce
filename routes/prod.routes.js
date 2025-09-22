const express = require("express");
const { PrismaClient } = require("../generated/prisma");

const productRouter = express.Router();
const prisma = new PrismaClient();

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
productRouter.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar produtos" });
  }
});

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Camiseta esportiva
 *               price:
 *                 type: number
 *                 example: 79.9
 *     responses:
 *       200:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Campos obrigatórios faltando
 *       500:
 *         description: Erro ao criar produto
 */
productRouter.post("/", async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res
      .status(400)
      .json({ error: "Campos obrigatórios: name, price" });
  }

  try {
    const product = await prisma.product.create({
      data: { name, price },
    });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Busca produto por ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 */
productRouter.get("/:id", async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
});

/**
 * @openapi
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Camiseta Premium
 *               price:
 *                 type: number
 *                 example: 99.9
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro ao atualizar produto
 */
productRouter.put("/:id", async (req, res) => {
  const { name, price } = req.body;

  try {
    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: { name, price },
    });

    res.json(product);
  } catch (err) {
    if (err.code === "P2025") {
      // Prisma lança P2025 se não encontrar
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
});

module.exports = productRouter;
