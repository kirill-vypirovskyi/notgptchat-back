'use strict';

const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: '30d' });
};

const validateAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = {
  generateAccessToken,
  validateAccessToken,
};
