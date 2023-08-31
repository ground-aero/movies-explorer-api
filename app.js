require('dotenv').config(); // После этого env-переменные из файла добавятся в process.env:
const express = require('express');
const mongoose = require('mongoose').default;
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorsHandler = require('./middlewares/errors-handler');
const routes = require('./routes');
const { PORT, DB_URL } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
// app.use(express.json());
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(`подключились к БД: ${process.env.DB_URL} \n`))
  .catch((err) => console.log('Ошибка подключения к базе данных: ', err.message));
console.log(process.env.NODE_ENV); // production

// * 2.
// app.use('/users', require('./models/user'));
app.use(bodyParser.json()); // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(requestLogger); // подкл. логгер запросов

app.use(routes); // вся маршрутизация в папке routes/

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // подкл. валидацию Joi/celebrate // 400
app.use(errorsHandler); // centralized err handler

app.listen(PORT, () => {
  console.log(`this app listening on port: ${PORT}`);
  // console.log(BASE_URL);
});
