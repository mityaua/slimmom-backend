const Joi = require('joi');
const { NotFoundError } = require('../helpers/errors');

module.exports = {
  validateAddProduct: (req, res, next) => {
    const schema = Joi.object({
      date: Joi.date().required(),
      productId: Joi.string().required(),
      weight: Joi.number().required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      new NotFoundError('Invalid request body');
    }
    next();
  },

  validateDeleteProduct: (req, res, next) => {
    const schema = Joi.object({
      dayId: Joi.string().required(),
      eatenProductId: Joi.string().required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      new NotFoundError('Invalid request body');
    }
    next();
  },

  validateInfoDay: (req, res, next) => {
    const schema = Joi.object({
      date: Joi.date().required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      new NotFoundError('Invalid request body');
    }
    next();
  },
};
