const User = require('../models/userModel');
const {
  signUpService,
  loginService,
  logoutService,
} = require('../services/authService');

const { getUserIdFromToken } = require('../middlewares/authMiddleware');

const signUpController = async (req, res) => {
  const { name, login, password } = req.body;
  const user = await User.findOne({ login: login });
  if (user) {
    return res.status(409).json({ message: 'Login in use' });
  }
  const accessToken = await signUpService(name, login, password);
  res.status(201).json({ status: 'success', accessToken });
};

const loginController = async (req, res) => {
  const { login, password } = req.body;
  const user = await loginService(login, password);
  res.status(200).json({ status: 'success', login, accessToken: user });
};

const logoutController = async (req, res) => {
  const accessToken = req.headers.authorization.split(' ')[1];
  const id = getUserIdFromToken(accessToken);
  await logoutService(id);
  res.status(204).end();
};

module.exports = {
  signUpController,
  loginController,
  logoutController,
};
