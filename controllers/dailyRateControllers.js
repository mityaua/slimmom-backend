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
  if (notAllowedProductsAll[0] === undefined) {
    notAllowedProducts = ['Кушать можно все'];
  } else {
    do {
      let index = Math.floor(Math.random() * notAllowedProductsAll.length);
      if (notAllowedProducts.includes(notAllowedProductsAll[index])) {
      } else if (notAllowedProducts.includes('undefined')) {
        break;
      } else {
        notAllowedProducts.push(notAllowedProductsAll[index]);
      }
    } while (notAllowedProducts.length !== 5);
  }
  if (notAllowedProductsAll.length === 0) {
    notAllowedProductsAll = ['Кушать можно все'];
  }

  const result = { notAllowedProductsAll, notAllowedProducts };
  return result;
};

module.exports = { getDailyRateUserController, getDailyRateController };
