const express = require('express');
const router = express.Router();

const { asyncWrapper } = require('../helpers/apiHelpers');

const {
  registrationController,
  loginController,
  logoutController,
} = require('../controllers/authController');

const {
  registrationValidation,
  loginValidation,
} = require('../middlewares/authValidation');

router.post(
  '/registration',
  registrationValidation,
  asyncWrapper(registrationController),
);
router.post('/login', loginValidation, asyncWrapper(loginController));
router.post('/logout', asyncWrapper(logoutController));

module.exports = router;
