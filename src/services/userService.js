'use strict';

const { ApiError } = require('../exceptions/ApiError');
const { User } = require('../models/User');
const { v4: uuid } = require('uuid');
const { emailService } = require('../services/emailService.js');
const bcrypt = require('bcrypt');

const normalize = ({ email, username, id }) => {
  return {
    email, username, id,
  };
};

const getByEmail = (email) => {
  return User.findOne({
    where: { email },
  });
};

const getByUsername = (username) => {
  return User.findOne({
    where: { username },
  });
};

const register = async({ email, username, password }) => {
  const existingEmail = await getByEmail(email);

  if (existingEmail) {
    throw ApiError.BadRequest('Email is already taken', {
      email: 'Email is already taken',
    });
  }

  const existingUsername = await getByUsername(username);

  if (existingUsername) {
    throw ApiError.BadRequest('Username is already taken', {
      username: 'Username is already taken',
    });
  }

  const activationToken = uuid();
  const hash = await bcrypt.hash(password, 10);

  await User.create({
    email,
    username,
    password: hash,
    activationToken,
  });

  await emailService.sendActivationLink(email, activationToken);
};

module.exports = {
  getByEmail,
  getByUsername,
  normalize,
  register,
};
