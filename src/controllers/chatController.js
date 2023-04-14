'use strict';

// const { Chat } = require('../models/Chat.js');
const chatService = require('../services/chatService.js');

const normalize = (chats) => {
  return chats.map(chat => ({
    id: chat.id,
    title: chat.title,
  }));
};

const getAll = async(req, res, next) => {
  const chats = await chatService.getAll();

  res.send(
    normalize(chats)
  );
};

const add = async(req, res, next) => {
  const { title, creatorId } = req.body;

  const newChat = await chatService.create(title, creatorId);

  res.statusCode = 201;

  res.send(newChat);
};

module.exports = {
  getAll, add,
};
