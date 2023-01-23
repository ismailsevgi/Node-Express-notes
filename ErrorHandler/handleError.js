// const loggerMiddleware = require('../middleware/logEvents');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  //   loggerMiddleware(req, res, next, 'errorlogs.txt');
  res.status(500).send(err.message);
};

module.exports = errorHandler;
