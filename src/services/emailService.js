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

const sendActivationLink = (email, token) => {
  const link = `${process.env.CLIENT_URL}#/activate/${token}`;

  send({
    email,
    subject: 'NotGPTChat account activation',
    html: `
    <h1>Click the link below to activate your account</h1>
    <a href="${link}">${link}</a>
    `,
  });
};

const emailService = {
  send, sendActivationLink,
};

module.exports = { emailService };
