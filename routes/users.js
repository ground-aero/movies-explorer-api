const router = require('express').Router();

// импорт модели
const User = require('../models/user');

router.post('/', (req, res) => {
  const { name, email, password } = req.body; // получим из объекта запроса имя и описание пользователя
  User.create({ name, email, password }) // созд. документ на основе пришедших данных
    .then(user => res.status(201).send({
      data: {
        _id: user._id,
        name,
        email,
      },
    })) // вернём записанные в Базу данные
    .catch(err => {
      if (err.code === 11000) {
        return next(new ConflictErr('Такой логин/емейл уже существует! (409)'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestErr('Переданы некорректные данные при создании пользователя'));
      }
      return next(err);
    });
});

module.exports = router;
