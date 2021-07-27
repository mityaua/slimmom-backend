const Day = require('../models/dayModel');
const User = require('../models/userModel');

const { updateDaySummary } = require('../helpers/dayHelpers/updateDaySummary');
const { createNewDay } = require('../helpers/dayHelpers/createNewDay');
const {
  calculateDailyRate,
} = require('../helpers/dailyRateHelpers/calculateDailyRate');
const {
  notAllowedProducts,
} = require('../helpers/dailyRateHelpers/notAllowedProducts');

const findUserByIdAndUpdateUserData = async (userId, reqBody, dailyRate) => {
  try {
    const UserData = await User.findByIdAndUpdate(
      userId,
      {
        userData: { ...reqBody, dailyRate },
      },
      { new: true },
    );
    return UserData;
  } catch (error) {
    throw error;
  }
};

const getDailyRateUser = async (reqBody, userId, unique) => {
  try {
    const dailyRate = calculateDailyRate(reqBody);
    const currentUser = await findUserByIdAndUpdateUserData(
      userId,
      reqBody,
      dailyRate,
    );

    const currentDate = new Date().toLocaleDateString('fr-ca');
    const existingDay = currentUser.days.find(
      ({ date }) => date === currentDate,
    );
    if (existingDay) {
      const day = await Day.findById(existingDay.id);
      return await updateDaySummary(day, dailyRate, unique);
    }
    return await createNewDay(currentUser, currentDate, unique);
  } catch (error) {
    throw error;
  }
};

module.exports = { getDailyRateUser };
