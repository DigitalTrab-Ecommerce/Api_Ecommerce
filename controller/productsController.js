require('dotenv').config();
const { PrismaClient } = require('../generated/prisma');
const { Ecommerce_confirmation_template } = require('../utils/constants');


const prisma = new PrismaClient();

class productsController {

    async postProd(req, res) {
        try {
            const { name, price, originalPrice, image, category, description, size, colors, isNew, isSale } = req.body;

            const newProd = await prisma.products.create({
                data: {
                    name,
                    price,
                    originalPrice,
                    image,
                    category,
                    description,
                    size,
                    colors,
                    isNew,
                    isSale
                }

            })
            res.status(201).send('Produto criado com sucesso' + newProd);



        } catch (error) {
            throw new Error(error)
        }
    }

    async getProd(req, res) {
        const allProds = await prisma.products.findMany();

        res.status(200).json(allProds);
    }

    async updateProd(req, res) {
        const { id } = req.params;

        const { name,
            price,
            originalPrice,
            image,
            category,
            description,
            size,
            colors,
            isNew,
            isSale
        } = req.body

        try {
            const updateProd = await prisma.products.update({
                where: {
                    id: id
                },
                data: {
                    name,
                    price,
                    originalPrice,
                    image,
                    category,
                    description,
                    size,
                    colors,
                    isNew,
                    isSale

                }
            });

            res.status(200).json(updateProd)
        } catch (error) {
            throw new Error(error);
        }

    }
}

module.exports = {productsController};