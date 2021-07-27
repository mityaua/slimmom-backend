const {
  calculateDailyRate,
} = require('../helpers/dailyRateHelpers/calculateDailyRate');

const { getDailyRateUser } = require('../services/dailyRateService');
const {
  notAllowedProducts,
} = require('../helpers/dailyRateHelpers/notAllowedProducts');

const getDailyRateController = async (req, res, next) => {
  try {
    const dailyRate = await calculateDailyRate(req.body);
    const unique = await notAllowedProductsObj(req.body.bloodType);
    return res.status(200).json({ dailyRate, notAllowedProducts: unique });
  } catch (error) {
    next(error);
  }
};

const getDailyRateUserController = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const unique = await notAllowedProductsObj(req.body.bloodType);
    const currentDay = await getDailyRateUser(req.body, userId, unique);
    return res.status(200).json(currentDay);
  } catch (error) {
    next(error);
  }
};

const notAllowedProductsObj = async bloodType => {
  const notAllowedProductsArray = await notAllowedProducts(bloodType);
  let arr = [];
  notAllowedProductsArray.map(({ title }) => arr.push(title.ru));
  arr = Object.values(arr);
  let unique = [...new Set(arr)];

  // let random = [];

  // for (let i = 0; i < 5; i++) {
  //   random[i] = unique[Math.floor(Math.random() * unique.length)];
  // }

  if (unique.length === 0) {
    unique = ['Кушать можно все'];
  }
  return unique;
};

module.exports = { getDailyRateUserController, getDailyRateController };
