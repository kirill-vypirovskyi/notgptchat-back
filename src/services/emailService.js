'use strict';

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const send = ({ email, subject, html }) => {
  return transporter.sendMail({
    from: 'Auth API', // sender address
    to: email, // list of receivers
    subject, // Subject line
    text: '', // plain text body
    html, // html body
  });
};

module.exports = { send };
