const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/userModel");
const { NotAuthorizedError } = require("../helpers/errors");

const loginService = async (login, password) => {
  const user = await User.findOne({ login });

  if (!user) {
    throw new NotAuthorizedError("Login or password is wrong");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError("Login or password is wrong");
  }

  const token = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET
  );

  await User.findByIdAndUpdate(user._id, { token });
  return token;
};

const registrationService = async (name, login, password) => {
  const user = new User({
    name,
    login,
    password,
  });
  await user.save();
  // сразу логин после регистрации
  loginService(login, password);
};

module.exports = {
  registrationService,
  loginService,
};
