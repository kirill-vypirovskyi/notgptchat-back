'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { authRouter } = require('./routes/authRouter');
const { chatRouter } = require('./routes/chatRouter');
const { messageRouter } = require('./routes/messageRouter');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
const { WebSocketServer } = require('ws');
const { emitter } = require('./emitter');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(authRouter);
app.use(chatRouter);
app.use(messageRouter);
app.use(errorMiddleware);

const server = app.listen(PORT);

const wss = new WebSocketServer({ server });

wss.on('connection', (client) => {
  window.console.log('connect');

  client.on('message', async(message) => {
    // const newMessage = await messageService.create(JSON.parse(message));

    window.console.log('ws message');

    // emitter.emit('message', newMessage);
  });
});

emitter.on('message', async(message) => {
  wss.clients.forEach((c) => {
    window.console.log(c);
    c.send(JSON.stringify(message));
  });

  // for (const client of wss.clients) {
  // client.send(JSON.stringify(message));
  // }
});
