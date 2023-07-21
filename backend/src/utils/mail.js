import config from "../configuration/config.js";
import nodamailer from 'nodemailer';
const transporter = nodamailer.createTransport({
  host: 'smtp.gmail.com',
  port: config.mailTransportPort,
  secure: true,
  auth: {
    user: config.mailTransport,
    pass: config.mailTransportPassword,
    authMethod: 'LOGIN'
  }
});

export default transporter;