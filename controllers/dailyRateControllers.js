const {
  calculateDailyRate,
} = require('../helpers/dailyRateHelpers/calculateDailyRate');

const { getDailyRateUser } = require('../services/dailyRateService');
const {
  notAllowedProductsBloodType,
} = require('../helpers/dailyRateHelpers/notAllowedProductsBloodType');

const getDailyRateController = async (req, res, next) => {
  try {
    const dailyRate = await calculateDailyRate(req.body);
    const { notAllowedProducts, notAllowedProductsAll } =
      await notAllowedProductsObj(req.body.bloodType);
    return res.status(200).json({
      dailyRate,
      notAllowedProducts: notAllowedProducts,
      notAllowedProductsAll: notAllowedProductsAll,
    });
  } catch (error) {
    next(error);
  }
};

const getDailyRateUserController = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const { notAllowedProducts, notAllowedProductsAll } =
      await notAllowedProductsObj(req.body.bloodType);

    const currentDay = await getDailyRateUser(
      req.body,
      userId,
      notAllowedProducts,
      notAllowedProductsAll,
    );
    return res.status(200).json(currentDay);
  } catch (error) {
    next(error);
  }
};

const notAllowedProductsObj = async bloodType => {
  const notAllowedProductsArray = await notAllowedProductsBloodType(bloodType);
  let arr = [];
  notAllowedProductsArray.map(({ title }) => arr.push(title.ru));
  arr = Object.values(arr);
  let notAllowedProductsAll = [...new Set(arr)];
  let notAllowedProducts = [];

  for (let i = 0; i < 5; i++) {
    notAllowedProducts[i] =
      notAllowedProductsAll[
        Math.floor(Math.random() * notAllowedProductsAll.length)
      ];
  }

  if (notAllowedProductsAll.length === 0) {
    notAllowedProductsAll = ['Кушать можно все'];
  }

  if (notAllowedProducts[0] === undefined) {
    notAllowedProducts = ['Кушать можно все'];
  }
  const result = { notAllowedProductsAll, notAllowedProducts };
  return result;
};

module.exports = { getDailyRateUserController, getDailyRateController };
