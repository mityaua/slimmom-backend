const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const { NotAuthorizedError } = require('../helpers/errors');

const loginService = async (login, password) => {
  const user = await User.findOne({ login });

  if (!user) {
    throw new NotAuthorizedError('Login or password is wrong');
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError('Login or password is wrong');
  }

  const accessToken = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET,
  );

  await User.findByIdAndUpdate(user._id, { accessToken });
  return accessToken;
};

const signUpService = async (name, login, password) => {
  const user = new User({
    name,
    login,
    password,
  });

  await user.save();
  // сразу логин после регистрации
  return await loginService(login, password);
};

const logoutService = async id => {
  const data = await User.updateOne({ _id: id }, { accessToken: null });
  return data;
};

module.exports = {
  signUpService,
  loginService,
  logoutService,
};
