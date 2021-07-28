const Day = require('../models/dayModel');
const User = require('../models/userModel');

const { updateDaySummary } = require('../helpers/dayHelpers/updateDaySummary');
const { createNewDay } = require('../helpers/dayHelpers/createNewDay');
const {
  calculateDailyRate,
} = require('../helpers/dailyRateHelpers/calculateDailyRate');

const findUserByIdAndUpdateUserData = async (
  userId,
  reqBody,
  dailyRate,
  notAllowedProducts,
  notAllowedProductsAll,
) => {
  try {
    const UserData = await User.findByIdAndUpdate(
      userId,
      {
        userData: {
          ...reqBody,
          dailyRate,
          notAllowedProducts,
          notAllowedProductsAll,
        },
      },
      { new: true },
    );
    return UserData;
  } catch (error) {
    throw error;
  }
};

const getDailyRateUser = async (
  reqBody,
  userId,
  notAllowedProducts,
  notAllowedProductsAll,
) => {
  try {
    const dailyRate = await calculateDailyRate(reqBody);
    const currentUser = await findUserByIdAndUpdateUserData(
      userId,
      reqBody,
      dailyRate,
      notAllowedProducts,
      notAllowedProductsAll,
    );

    const currentDate = new Date().toLocaleDateString('fr-ca');
    const existingDay = currentUser.days.find(
      ({ date }) => date === currentDate,
    );
    if (existingDay) {
      const day = await Day.findById(existingDay.id);
      return await updateDaySummary(day, dailyRate);
    }

    return await createNewDay(currentUser, currentDate);
  } catch (error) {
    throw error;
  }
};

module.exports = { getDailyRateUser };
