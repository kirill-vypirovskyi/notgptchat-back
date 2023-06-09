/* eslint-disable max-len */
'use strict';

const express = require('express');
const { authController } = require('../controllers/authController');
const { catchError } = require('../utils/catchError');

const authRouter = new express.Router();

authRouter.post('/registration', catchError(authController.register));
authRouter.get('/activation/:activationToken', catchError(authController.activate));
authRouter.post('/login', catchError(authController.login));
authRouter.post('/check', catchError(authController.checkAuth));

module.exports = { authRouter };
