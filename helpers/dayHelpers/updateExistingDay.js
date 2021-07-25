const Day = require('../../models/dayModel');

const { calculateEatenProduct } = require('./calculateEatenProduct');
const { updateDaySummary } = require('./updateDaySummary');
const { isNotAllowedProduct } = require('./isNotAllowedProduct');
const { isFirstNotAllowedProduct } = require('./isFirstNotAllowedProduct');

const findDayByIdAndUpdateEatenProducts = async (dayId, productCalculated) => {
  return await Day.findByIdAndUpdate(
    dayId,
    {
      $push: { eatenProducts: productCalculated },
    },
    { new: true },
  );
};

const findDayByIdAndUpdateNotAllowedProducts = async (
  dayId,
  notAllowedProduct,
) => {
  return await Day.findByIdAndUpdate(
    dayId,
    {
      $push: { notAllowedProducts: notAllowedProduct },
    },
    { new: true },
  );
};

const updateExistingDay = async (user, eatenProduct, weight, dayId) => {
  const { dailyRate, bloodType } = user.userData;

  try {
    const productCalculated = calculateEatenProduct(eatenProduct, weight);

    const notAllowed = isNotAllowedProduct(bloodType, eatenProduct);
    if (notAllowed) {
      const notAllowedProduct = await isFirstNotAllowedProduct(
        dayId,
        notAllowed,
      );
      await findDayByIdAndUpdateNotAllowedProducts(dayId, notAllowedProduct);
    }

    const updatedDayEatenProducts = await findDayByIdAndUpdateEatenProducts(
      dayId,
      productCalculated,
    );

    return await updateDaySummary(updatedDayEatenProducts, dailyRate);
  } catch (error) {
    throw error;
  }
};
module.exports = { updateExistingDay };
