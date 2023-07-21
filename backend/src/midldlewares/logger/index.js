import logger from "../../utils/logger.js";

export function log(req, res, next) {
  req.logger = logger;
  logger.http(`url request:${req.originalUrl}\
  method: ${req.method}`)
  logger.http(`Body\
   ${JSON.stringify(req.body)}\
   Params\
   ${JSON.stringify(req.params)}\
   Query\
   ${JSON.stringify(req.query)}\
  `);
  next();
}
