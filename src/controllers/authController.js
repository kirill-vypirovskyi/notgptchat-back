'use strict';

const { User } = require('../models/User.js');
const userService = require('../services/userService.js');
const jwtService = require('../services/jwtService.js');
const { ApiError } = require('../exceptions/ApiError.js');
const bcrypt = require('bcrypt');

const validateEmail = (email) => {
  // eslint-disable-next-line max-len
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!pattern.test(email)) {
    return 'E-mail is not valid';
  }
};

const validateUsername = (username) => {
  const pattern = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

  if (!pattern.test(username)) {
    return 'Username is not valid';
  }
};

const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 8) {
    return 'At least 8 characters';
  }
};

const register = async(req, res, next) => {
  const { email, username, password } = req.body;

  const errors = {
    email: validateEmail(email),
    username: validateUsername(username),
    password: validatePassword(password),
  };

  if (errors.email || errors.password || errors.username) {
    throw ApiError.BadRequest('Validation error', errors);
  }

  await userService.register({
    email, username, password,
  });

  res.send({ message: 'OK' });
};

const activate = async(req, res, next) => {
  const { activationToken } = req.params;

  const user = await User.findOne({
    where: { activationToken },
  });

  if (!user) {
    throw ApiError.NotFound();
  }

  user.activationToken = null;
  await user.save();

  res.send(user);
};

const login = async(req, res, next) => {
  const { email, password } = req.body;
  const user = await userService.getByEmail(email);

  if (!user) {
    throw ApiError.BadRequest('User with this email does not exist');
  }

  const isPasswordvalid = await bcrypt.compare(password, user.password);

  if (!isPasswordvalid) {
    throw ApiError.BadRequest('Password is wrong', {
      password: 'Password is wrong',
    });
  }

  const userData = userService.normalize(user);
  const accessToken = jwtService.generateAccessToken(userData);

  res.send({
    user: userData,
    accessToken,
  });
};

const checkAuth = async(req, res, next) => {
  const { token } = req.body;

  if (!token) {
    throw ApiError.BadRequest('No access token');
  }

  const userData = jwtService.validateAccessToken(token);

  if (!userData) {
    throw ApiError.NotFound();
  }

  res.send({
    user: userService.normalize(userData),
  });
};

const authController = {
  register, activate, login, checkAuth,
};

module.exports = { authController };
