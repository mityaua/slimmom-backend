const {
  registrationService,
  loginService,
} = require("../services/authService");

const registrationController = async (req, res) => {
  const { name, login, password } = req.body;

  await registrationService(name, login, password);
  res.json({ status: "success" });
};

const loginController = async (req, res, next) => {
  const { login, password } = req.body;
  const user = await loginService(login, password);

  res.json({ status: "success", login, token: user });
};

module.exports = {
  registrationController,
  loginController,
};
