'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { authRouter } = require('./routes/authRouter');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(authRouter);

app.get('/', (req, res) => {
  res.send('server is working');
});

app.listen(PORT);
