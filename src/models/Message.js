'use strict';

const { sequelize } = require('../utils/db');
const { DataTypes } = require('sequelize');

const Message = sequelize.define('message', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chatId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { Message };
