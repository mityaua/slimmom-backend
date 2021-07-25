const Day = require('../models/dayModel');
const User = require('../models/userModel');

const { updateDaySummary } = require('../helpers/dayHelpers/updateDaySummary');
const { createNewDay } = require('../helpers/dayHelpers/createNewDay');
const {
  calculateDailyRate,
} = require('../helpers/dailyRateHelpers/calculateDailyRate');

const findUserByIdAndUpdateUserData = (userId, reqBody, dailyRate) => {
  try {
    console.log('тут');
    return User.findByIdAndUpdate(
      userId,
      { $push: { userData: { ...reqBody, dailyRate } } },
      { new: true },
    );
  } catch (error) {
    throw error;
  }
};

const getDailyRateUser = async (reqBody, userId) => {
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
      return await updateDaySummary(day, dailyRate);
    }
    return await createNewDay(currentUser, currentDate);
  } catch (error) {
    throw error;
  }
};

module.exports = { getDailyRateUser };
