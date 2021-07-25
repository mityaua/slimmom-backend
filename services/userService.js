const { User } = require('../models/userModel');

const getUserById = async userId => {
  return await User.findById(userId);
};
// day
const findUserByIdAndUpdateDays = async (userId, day) => {
  const { _id, date } = day;
  return await User.findByIdAndUpdate(userId, {
    $push: { days: { id: id, date } },
  });
};

// daily-rate
const findUserByIdAndUpdateUserData = async (userId, reqBody, dailyRate) => {
  return await User.findByIdAndUpdate(
    userId,
    { userData: { ...reqBody, dailyRate } },
    { new: true },
  );
};

module.exports = {
  getUserById,
  findUserByIdAndUpdateDays,
  findUserByIdAndUpdateUserData,
};
