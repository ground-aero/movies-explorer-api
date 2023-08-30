const express = require('express');
const mongoose = require('mongoose').default;
require('dotenv').config(); // чтение env-переменных из .env-файла
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorsHandler = require('./middlewares/errors-handler');
const routes = require('./routes');
// const usersRouter = require('./routes/users');
// const { PORT } = require('./config');
// const usersRouter = require('./routes/users');

const app = express();
// app.use(express.json());
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(`подключились к БД: ${process.env.MONGO_URL} \n`))
  .catch((err) => console.log('Ошибка подключения к базе данных: ', err.message));

// * 2.
// app.use('/users', require('./models/user'));
app.use(bodyParser.json()); // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(routes); // вся маршрутизация в паапке routes/
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use(errors()); // подкл. валидацию Joi/celebrate // 400
app.use(errorsHandler);
// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message,
//     },
//   });
//   next();
// });

app.listen(process.env.PORT, () => {
  console.log(`this app listening on port: ${process.env.PORT}`);
  // console.log(BASE_URL);
});
