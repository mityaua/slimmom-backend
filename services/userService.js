const { User } = require('../models/userModel');

const getUserById = async id => {
  return await User.findById(id);
};

module.exports = {
  getUserById,
};
