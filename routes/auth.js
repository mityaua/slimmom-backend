const express = require('express');
const router = express.Router();

const { asyncWrapper } = require('../helpers/apiHelpers');

const {
  signUpController,
  loginController,
  logoutController,
} = require('../controllers/authController');

const {
  signUpValidation,
  loginValidation,
} = require('../middlewares/authValidation');

router.post('/signup', signUpValidation, asyncWrapper(signUpController));
router.post('/login', loginValidation, asyncWrapper(loginController));
router.post('/logout', asyncWrapper(logoutController));

module.exports = router;
