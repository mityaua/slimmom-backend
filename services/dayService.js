const Day = require('../models/dayModel');
const User = require('../models/userModel');

const {
  checkEatenProduct,
} = require('../helpers/dayHelpers/checkEatenProduct');

const {
  updateExistingDay,
} = require('../helpers/dayHelpers/updateExistingDay');

const { createNewDay } = require('../helpers/dayHelpers/createNewDay');
const { updateCurrentDay } = require('../helpers/dayHelpers/updateCurrentDay');

const addProductPerDay = async (reqBody, user) => {
  const { date, productId, weight } = reqBody;
  const userDays = user.days;

  try {
    const eatenProduct = await checkEatenProduct(productId);
    const isSuchDay = await userDays.find(day => day.date === date);
    if (isSuchDay) {
      return updateExistingDay(user, eatenProduct, weight, isSuchDay.id);
    }
    return createNewDay(user, date, eatenProduct, weight);
  } catch (error) {
    throw error;
  }
};

const deleteProductPerDay = async (dayId, eatenProductId) => {
  try {
    const currentDay = await Day.findById(dayId);

    const { eatenProducts, daySummary } = currentDay;

    const updatedEatenProducts = eatenProducts.filter(product => {
      return String(product._id) !== eatenProductId;
    });
    const updatedDayData = await updateCurrentDay(
      dayId,
      updatedEatenProducts,
      daySummary,
    );
    return { updatedDayData, updatedEatenProducts };
  } catch (error) {
    throw error;
  }
};

const infoPerDay = async (date, user) => {
  const userId = user._id;

  try {
    const user = await User.findById(userId);

    const userDay = user.days.find(day => day.date === date);

    if (userDay) {
      return await Day.findById(userDay.id);
    }

    return await createNewDay(user, date);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addProductPerDay,
  deleteProductPerDay,
  infoPerDay,
};
