import dotenv from 'dotenv';
import { nodeEnv } from '../utils/constants.js';
dotenv.config({
  path: process.env.NODE_ENV === nodeEnv.production ? './.env.development' : './.env.production'
});

export default {
  port: process.env.PORT ?? '8080',
  dbSelection: process.env.DB_SELECTION,
  dbUrl: process.env.DB_URL,
  sessionSecret: process.env.SESSION_SECRET,
  salt: process.env.SALT,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
};
