const express = require('express')
const {productsController} = require('../controller/productsController');

const prodRoutes =  express.Router();


prodRoutes.get('/', new productsController().getProd)/
prodRoutes.post('/', new productsController().postProd);


module.exports = prodRoutes;