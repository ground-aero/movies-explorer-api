const winston = require('winston');
const expressWinston = require('express-winston');

// созд. логгер запросов
const requestLogger = expressWinston.logger({
  // transports отвечает за то, куда нужно писать лог
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

// Созд. логгер ошибок ( имя ошибки, сообщение и её стектрейс).
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};

// затем импортируем в app.js
