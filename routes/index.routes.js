const express = require('express');
const prodRoutes = require('./prod.routes');
const emailRoutes = require('./email.routes');
const userRoutes = require('./user.routes');

const router = express.Router();

router.use('/prods', prodRoutes);
router.use('/email', emailRoutes);
router.use('/users', userRoutes);

module.exports = router;