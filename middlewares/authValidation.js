const Joi = require('joi');

module.exports = {
  signUpValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      login: Joi.string().min(3).max(50).required(),
      password: Joi.string().alphanum().min(6).max(50).required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.message });
    }

    next();
  },

  loginValidation: (req, res, next) => {
    const schema = Joi.object({
      login: Joi.string().min(3).max(50).required(),
      password: Joi.string().alphanum().min(6).max(50).required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.message });
    }

    next();
  },
};
