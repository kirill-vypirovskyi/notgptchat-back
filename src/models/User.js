'use strict';

const { sequelize } = require('../utils/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { User };
