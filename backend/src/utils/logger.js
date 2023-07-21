import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  defaultMeta: { service: 'Ecommerce-EGY' },
  format: format.combine(
    format.timestamp(),
    format.align(),
    format.printf(({ level, message, timestamp, service }) => `${service} - ${timestamp} [${level}]: ${message}`)
  ),
  transports: process.env.NODE_ENV !== 'production'
  ? [
      new transports.Console({ level: 'debug' })
    ]
  : [
      new transports.File({ filename: './logs/error.log', level: 'error' }),
      new transports.File({ filename: './logs/ecommers.log', level: 'info'}),
      new transports.Console({ level: 'info' })
    ]
  }
);

export default logger;