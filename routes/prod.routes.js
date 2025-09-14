const express = require('express')
const {productsController} = require('../controller/productsController');

const prodRoutes =  express.Router();


prodRoutes.get('/', new productsController().getProd);
prodRoutes.post('/', new productsController().postProd);
prodRoutes.put('/:id', new productsController().updateProd);
prodRoutes.delete('/:id', new productsController().deleteProd);

module.exports = prodRoutes;