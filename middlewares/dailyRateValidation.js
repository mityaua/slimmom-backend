const Joi = require('joi');
const { NotAuthorizedError } = require('../helpers/errors');

const validateGetDailyRate = (req, res, next) => {
  const validationDailyRate = Joi.object({
    currentWeight: Joi.number().required(),
    height: Joi.number().required(),
    age: Joi.number().required(),
    desiredWeight: Joi.number().required(),
    bloodType: Joi.number().required(),
  });

  const value = validationDailyRate.validate(req.body);

  if (value.error) {
    next(NotAuthorizedError('Invalid data'));
  }

  next();
};

exports.module = { validateGetDailyRate };
