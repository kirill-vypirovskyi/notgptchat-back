'use strict';

const { Chat } = require('../models/Chat');

const getAll = async() => {
  const allChats = await Chat.findAll();

  return allChats;
};

const create = async(title, creatorId) => {
  return Chat.create({
    title,
    creatorId,
  });
};

module.exports = {
  getAll,
  create,
};
