const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const uuid = require('uuid').v4;
const { format } = require('date-fns');

const logEvents = async (msg, fileName) => {
  const dateTime = format(new Date(), 'yyyy/MM/dd HH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${msg}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, '../logs'))) {
      fs.mkdir(path.join(__dirname, '../logs'), (err) => {
        if (err) throw err;
        console.log('Log file is created');
      });
    }

    if (!fs.existsSync(path.join(__dirname, '..', 'logs', fileName))) {
      fsPromises.writeFile(
        path.join(__dirname, '..', 'logs', fileName),
        logItem,
        (err) => {
          if (err) throw err;
          console.log('Success!');
        }
      );
    } else {
      fsPromises.appendFile(
        path.join(__dirname, '..', 'logs', fileName),
        `${logItem}`,
        (err) => {
          if (err) throw err;
          console.log('Success!');
        }
      );
    }
  } catch (error) {
    console.log('Error: ', error);
  }
};

const loggerMiddleware = (req, res, next) => {
  //custom middlewares need "next"
  let location;
  switch (req.url) {
    case '/':
    case '/index':
      location = 'homeLog.txt';
      break;
    default:
      location = 'blogLog.txt';
      break;
  }

  logEvents(`${req.method}\t${req.headers.origin} ${req.url}`, location);
  next();
};

module.exports = loggerMiddleware;
