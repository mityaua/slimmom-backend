const User = require('../models/userModel');

const getUserById = async userId => {
  return await User.findById(userId);
};

module.exports = {
  getUserById,
};
