'use strict';

const { User } = require('../models/User.js');

const register = async(req, res, next) => {
  const { email, username, password } = req.body;

  const user = await User.create({
    email, username, password,
  });

  res.send(user);
};

const authController = { register };

module.exports = { authController };
