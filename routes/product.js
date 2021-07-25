const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, productsController.getProduct);

module.exports = router;
