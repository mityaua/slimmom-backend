const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/', productsController.listProductsPerDay);

router.post('/', authMiddleware, productsController.addProductPerDay);

router.delete(
  '/:productId',
  authMiddleware,
  productsController.removeProductPerDay,
);

router.post('/getmycaloriespublic', productsController.caloriesNormalize);

router.post(
  '/getmycalories',
  authMiddleware,
  productsController.caloriesNormalizePrivate,
);

router.get(':query', productsController.getProductByName);

module.exports = router;
