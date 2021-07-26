const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middlewares/authMiddleware');
const {
  addProductPerDayController,
  deleteProductPerDayController,
  infoPerDayController,
} = require('../controllers/dayController');

const {
  validateAddProduct,
  validateDeleteProduct,
  validateInfoDay,
} = require('../middlewares/dayValidation');

router.post(
  '/',
  authMiddleware,
  validateAddProduct,
  addProductPerDayController,
);

router.delete(
  '/',
  authMiddleware,
  validateDeleteProduct,
  deleteProductPerDayController,
);

router.post('/info', authMiddleware, validateInfoDay, infoPerDayController);

module.exports = router;
