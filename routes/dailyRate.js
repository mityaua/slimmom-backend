const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middlewares/authMiddleware');
const { validateGetDailyRate } = require('../middlewares/dailyRateValidation');
const dailyRateControllers = require('../controllers/dailyRateControllers');

router.post(
  '/',
  validateGetDailyRate,
  dailyRateControllers.getDailyRateController,
);

router.post(
  '/:userId',

  authMiddleware,
  validateGetDailyRate,
  dailyRateControllers.getDailyRateUserController,
);

module.exports = router;
