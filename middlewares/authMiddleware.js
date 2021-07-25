const jwt = require('jsonwebtoken');
const User = require('../services/userService');
const JWT_SECRET = process.env.JWT_SECRET;
const { NotAuthorizedError } = require('../helpers/errors');

const authMiddleware = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    next(new NotAuthorizedError('Not authorized'));
  }
  try {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, JWT_SECRET, async (error, decoded) => {
      const user = await User.getUserById(decoded?._id);
      if (error || !user || !user.token || user.token !== token) {
        next(new NotAuthorizedError('Invalide token'));
      }
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

const getUserIdFromToken = token => {
  let user = '';
  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    user = decoded?._id;
  });
  return user;
};

module.exports = {
  authMiddleware,
  getUserIdFromToken,
};
