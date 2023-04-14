/* eslint-disable max-len */
'use strict';

const express = require('express');
const messageController = require('../controllers/messageController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { catchError } = require('../utils/catchError');

const messageRouter = new express.Router();

messageRouter.get('/messages/:chatId', catchError(authMiddleware), catchError(messageController.getAll));
messageRouter.post('/messages/:chatId', catchError(authMiddleware), catchError(messageController.create));

module.exports = { messageRouter };
