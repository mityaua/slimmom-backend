const Day = require('../../models/dayModel');

const { calculateEatenProduct } = require('./calculateEatenProduct');
const { calculateDaySummary } = require('./calculateDaySummary');
const { isNotAllowedProduct } = require('./isNotAllowedProduct');

const findUserByIdAndUpdateDays = async (userId, day) => {
  const { _id, date } = day;
  return await User.findByIdAndUpdate(userId, {
    $push: { days: { id: _id, date } },
  });
};

const createNewDay = async (currentUser, date, eatenProduct, weight) => {
  const { dailyRate, bloodType } = currentUser.userData;
  const userId = currentUser._id;
  try {
    const productCalculated = eatenProduct
      ? calculateEatenProduct(eatenProduct, weight)
      : null;

    const notAllowedProduct = eatenProduct
      ? isNotAllowedProduct(bloodType, eatenProduct)
      : null;

    const kcal = productCalculated ? productCalculated.kcal : 0;

    const newDay = {
      eatenProducts: productCalculated ? [productCalculated] : [],
      date,
      daySummary: calculateDaySummary(kcal, dailyRate),
      notAllowedProducts: notAllowedProduct ? [notAllowedProduct] : [],
    };

    const currentDay = await Day.create(newDay);

    await findUserByIdAndUpdateDays(userId, currentDay);

    return currentDay;
  } catch (error) {
    throw error;
  }
};

module.exports = { createNewDay };
