// секретное слово для jwt обычно используется в проекте в двух местах,
// Хорошим тоном будет вынесение секрета в отдельную переменную,с выносом в переменные окружения
// вызов метода config() библиотеки dotenv => ищет в корне файла .env
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';
const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/bitfilmsdb';
// const {
//   JWT_SECRET,
//   DB_URL,
//   NODE_ENV,
// } = process.env;
//
// module.exports = {
//   JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET',
//   DB_URL: NODE_ENV === 'production' ? DB_URL : 'mongodb://127.0.0.1:27017/mestodb',
//   // MONGO_URL: NODE_ENV === 'production' ? MONGO_URL : 'mongodb://0.0.0.0:27017/mestodb',
// };
module.exports = {
  PORT,
  JWT_SECRET,
  DB_URL,
};
