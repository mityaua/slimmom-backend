const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middlewares/authMiddleware');
const dailyRateControllers = require('../controllers/dailyRateControllers');

router.post('/', dailyRateControllers.getDailyRateController);

router.post(
  '/:userId',
  authMiddleware,
  dailyRateControllers.getDailyRateUserController,
);

module.exports = router;
