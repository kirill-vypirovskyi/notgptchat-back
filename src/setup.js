'use strict';

require('dotenv').config();

const { sequelize } = require('./utils/db');

require('./models/User.js');

sequelize.sync({ forse: true });
