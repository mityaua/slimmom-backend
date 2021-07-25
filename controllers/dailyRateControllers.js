const {
  calculateDailyRate,
} = require('../helpers/dailyRateHelpers/calculateDailyRate');

const { getDailyRateUser } = require('../services/dailyRateService');

const getDailyRateController = async (req, res, next) => {
  try {
    console.log(req.body);
    const dailyRate = await calculateDailyRate(req.body);
    return res.status(200).json({ dailyRate, notAllowedProducts: [] });
  } catch (error) {
    next(error);
  }
};

const getDailyRateUserController = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const currentDay = await getDailyRateUser(req.body, userId);
    return res.status(200).json(currentDay);
  } catch (error) {
    next(error);
  }
};

module.exports = { getDailyRateUserController, getDailyRateController };
