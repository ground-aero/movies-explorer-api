require('dotenv').config(); // env-переменные из файла добавятся в process.env:
const express = require('express');
const mongoose = require('mongoose').default;
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const errorsHandler = require('./middlewares/errors-handler');
const routes = require('./routes');
const { PORT, DB_URL } = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');

const app = express();
// app.use(express.json());

// const corsOptions = {
//   origin: true,
//   credentials: true,
// };
app.use(cors());
// app.use(cors({ origin: 'http://127.0.0.1:4000' })); // разреш кросс-домейн reqs с origin: 3000
// app.use(cors({
//   origin: [
//     'http://localhost:3000',
//     'http://ga-movies.nomoredomains.icu.ru',
//     'https://ga-movies.nomoredomains.icu.ru',
//   ],
// }));

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
app.use(helmet());
app.use(morgan('dev'));
app.use(requestLogger); // подкл. логгер запросов
app.use(limiter);

app.use(routes); // вся маршрутизация в папке routes/

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // подкл. валидацию Joi/celebrate // 400
app.use(errorsHandler); // centralized err handler

app.listen(PORT, () => {
  console.log(`this app listening on port: ${PORT}`);
  // console.log(BASE_URL);
});
