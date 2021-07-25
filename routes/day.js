const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middlewares/authMiddleware');
const {
  addProductPerDayController,
  deleteProductPerDayController,
  infoPerDayController,
} = require('../controllers/dayController');

router.post('/', authMiddleware, addProductPerDayController);

router.delete('/', authMiddleware, deleteProductPerDayController);

router.post('/info', authMiddleware, infoPerDayController);

module.exports = router;
