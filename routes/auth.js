const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../helpers/apiHelpers");

const {
  registrationController,
  loginController,
} = require("../controllers/authController");

const {
  registrationValidation,
  loginValidation,
} = require("../middlewares/authValidation");

router.post(
  "/registration",
  registrationValidation,
  asyncWrapper(registrationController)
);
router.post("/login", loginValidation, asyncWrapper(loginController));

module.exports = router;
