const Day = require('../../models/dayModel');
const { calculateDaySummary } = require('./calculateDaySummary');

const findDayByIdAndUpdateDaySummary = async (dayId, daySummary) => {
  return await Day.findByIdAndUpdate(dayId, { daySummary }, { new: false });
};
const updateDaySummary = async (day, dailyRate) => {
  try {
    const { id, eatenProducts } = day;
    const kcal = eatenProducts.reduce((sumCalories, product) => {
      return sumCalories + product.kcal;
    }, 0);
    const daySummary = calculateDaySummary(kcal, dailyRate);
    return await findDayByIdAndUpdateDaySummary(id, daySummary);
  } catch (error) {
    throw error;
  }
};
module.exports = { updateDaySummary };
