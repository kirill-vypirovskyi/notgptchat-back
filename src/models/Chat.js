'use strict';

const { sequelize } = require('../utils/db');
const { DataTypes } = require('sequelize');

const Chat = sequelize.define('chat', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  participants: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
});

module.exports = { Chat };
