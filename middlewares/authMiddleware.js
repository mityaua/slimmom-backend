const jwt = require('jsonwebtoken');
const User = require('../services/userService');
const config = require('../config/auth.config');
const { NotAuthorizedError } = require('../helpers/errors');

const authMiddleware = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    next(new NotAuthorizedError('Not authorized'));
  }

  try {
    if (req.headers.authorization !== undefined) {
      const accessToken = req.headers.authorization.split(' ')[1];

      jwt.verify(accessToken, config.secret, async (error, decoded) => {
        const user = await User.getUserById(decoded?._id);
        if (
          error ||
          !user ||
          !user.accessToken ||
          user.accessToken !== accessToken
        ) {
          next(new NotAuthorizedError('Invalid token'));
        }
        req.user = user;
        next();
      });
    }
  } catch (error) {
    next(error);
  }
};

const getUserIdFromToken = accessToken => {
  let user;
  jwt.verify(accessToken, config.secret, (error, decoded) => {
    user = decoded._id;
  });
  return user;
};

module.exports = {
  authMiddleware,
  getUserIdFromToken,
};
