'use strict';

const { Message } = require('../models/Message');

const getAll = async(chatId) => {
  const allMessages = await Message.findAll({
    where: {
      chatId,
    },
    order: [
      ['createdAt', 'ASC'],
    ],
  });

  return allMessages;
};

const create = async({ username, chatId, text }) => {
  return Message.create({
    username,
    chatId,
    text,
  });
};

module.exports = {
  getAll,
  create,
};
