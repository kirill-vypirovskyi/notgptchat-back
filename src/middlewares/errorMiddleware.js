'use strict';

const { ApiError } = require('../exceptions/ApiError');

const errorMiddleware = (error, req, res, next) => {
  if (error instanceof ApiError) {
    const { status, message, errors } = error;

    res.status(status).send({
      message, errors,
    });
  }

  res.status(500).send({
    message: 'Unknown error',
  });
};

module.exports = { errorMiddleware };
