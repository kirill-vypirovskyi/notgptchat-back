'use strict';

const messageService = require('../services/messageService.js');

const { emitter } = require('../emitter');

const normalize = (message) => {

};

const getAll = async(req, res, next) => {
  const { chatId } = req.params;

  const messages = await messageService.getAll(chatId);

  res.send(messages);
};

const create = async(req, res, next) => {
  const { username, chatId, text } = req.body;

  const message = await messageService.create({
    username, chatId, text,
  });

  emitter.emit('message', JSON.stringify(message));
  res.send(message);
};

module.exports = {
  normalize, getAll, create,
};
