/* eslint-disable max-len */
'use strict';

const express = require('express');
const chatController = require('../controllers/chatController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { catchError } = require('../utils/catchError');

const chatRouter = new express.Router();

// chatRouter.get('/main', authMiddleware, catchError(chatController.getAll));
chatRouter.post('/create', catchError(authMiddleware), catchError(chatController.add));
chatRouter.get('/chats', catchError(authMiddleware), catchError(chatController.getAll));

module.exports = { chatRouter };
