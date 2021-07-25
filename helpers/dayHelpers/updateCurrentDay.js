const Day = require('../../models/dayModel');
const { calculateDaySummary } = require('./calculateDaySummary');

const findDayByIdAndUpdateEatenProductsAndDaySummary = async (
  dayId,
  updatedEatenProducts,
  updatedDaySummary,
) => {
  return await Day.findByIdAndUpdate(dayId, {
    eatenProducts: updatedEatenProducts,
    daySummary: updatedDaySummary,
  });
};

const updateCurrentDay = async (dayId, updatedEatenProducts, daySummary) => {
  try {
    const kcal = updatedEatenProducts.reduce((sumCalories, product) => {
      return sumCalories + product.kcal;
    }, 0);

    const updatedDaySummary = calculateDaySummary(kcal, daySummary.dailyRate);

    await findDayByIdAndUpdateEatenProductsAndDaySummary(
      dayId,
      updatedEatenProducts,
      updatedDaySummary,
    );

    return updatedDaySummary;
  } catch (error) {
    throw error;
  }
};

module.exports = { updateCurrentDay };
