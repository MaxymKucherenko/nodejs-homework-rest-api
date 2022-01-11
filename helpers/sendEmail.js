const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: 'k.maxym21@gmail.com' }
  try {
    await sgMail.send(email)
    console.log('Email has been sended')
    return true
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = sendEmail
