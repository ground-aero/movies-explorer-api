const express = require('express');
const mongoose = require('mongoose').default;
const bodyParser = require('body-parser');
const morgan = require('morgan');

// const usersRouter = require('./routes/users');
const MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const { PORT = 4000, BASE_URL } = process.env; // на этом порту будет прослушиватель Сервера
const app = express();

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(`подключились к БД: ${MONGO_URL} \n`))
  .catch((err) => console.log('Ошибка подключения к базе данных: ', err.message));

/* 2. **/
app.use('/users', require('models/user'));
app.use(bodyParser.json()); // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message,
//     },
//   });
//   next();
// });
// app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`this app listening on port: ${PORT}`);
  console.log(BASE_URL);
});
