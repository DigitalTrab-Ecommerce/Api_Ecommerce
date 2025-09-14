const express = require('express');
const prodRoutes = require('./prod.routes');

const router = express.Router();

router.use('/prods', prodRoutes)

module.exports = router;