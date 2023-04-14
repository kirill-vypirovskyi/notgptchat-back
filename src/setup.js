'use strict';

require('dotenv').config();

const { sequelize } = require('./utils/db');

require('./models/User.js');
require('./models/Chat.js');
require('./models/Message.js');

sequelize.sync({ force: true });
