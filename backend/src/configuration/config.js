import dotenv from 'dotenv';
import { nodeEnv } from '../utils/constants.js';
dotenv.config({
  path: process.env.NODE_ENV === nodeEnv.production ? './.env.production' : './.env.development'
});

export default {
  port: process.env.PORT ?? '8080',
  dbSelection: process.env.DB_SELECTION,
  dbUrl: process.env.DB_URL,
  sessionSecret: process.env.SESSION_SECRET,
  salt: process.env.SALT,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  mailTransportPassword: process.env.MAIL_TRANSPORT_PASSWORD,
  mailTransport: process.env.MAIL_TRANSPORT,
  mailTransportPort: process.env.MAIL_TRANSPORT_PORT,
  recoverPasswordTime: process.env.RECOVER_PASSWORD_TIME
};
