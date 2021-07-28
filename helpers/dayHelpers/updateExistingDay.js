const Day = require('../../models/dayModel');

const { calculateEatenProduct } = require('./calculateEatenProduct');
const { updateDaySummary } = require('./updateDaySummary');

const findDayByIdAndUpdateEatenProducts = async (dayId, productCalculated) => {
  return await Day.findByIdAndUpdate(
    dayId,
    {
      $push: { eatenProducts: productCalculated },
    },
    { new: true },
  );
};

const updateExistingDay = async (user, eatenProduct, weight, dayId) => {
  const { dailyRate } = user.userData;

  try {
    const productCalculated = calculateEatenProduct(eatenProduct, weight);
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
