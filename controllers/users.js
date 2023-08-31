require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
// const { JWT_SECRET } = require('../config');
const NotFoundErr = require('../errors/not-found-err');
const ConflictErr = require('../errors/conflict-err');
const BadRequestErr = require('../errors/bad-req-err');
const { JWT_SECRET } = require('../config');

const { NODE_ENV } = process.env;

/** back: POST /signup
 *  front: POST /auth/local/register
 * Создаеть польз-ля с переданными в body: { name, email, password }
 * @return {Promise} */
module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body; // получим из объекта req: имя,email,passw

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    // вернем/созд док на осн приш. данных. Вернём записаные в базу данные
    .then((user) => res.status(201).send({ // Передавать хеш пароля обратно пользователю ни к чему
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictErr('Такой логин-емейл уже существует! /409'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestErr('Переданы некорректные данные при создании пользователя /400'));
      }
      return next(err);
    })
    .catch(next);
};

/** @param req: почта и пароль, и проверить их
 *  @param res: вернуть JWT, если в теле запроса переданы правильные почта и пароль.
 * backend:  POST /signin
 * frontend: POST /auth/local */
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  // ToDo: 1)find user, 2)check pass.., 3)return jwt & user
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        // user,
        token: jsonwebtoken.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' },
        ),
      });
      // /** библ. jsonwebtoken, вызовом метода .sign создаем токен.
      //  * Методу sign передаем 2 аргумента: пейлоуд токена и секретный ключ подписи.
      //  * Пейлоуд токена — зашифрованный в строку объект пользователя, его достаточно,
      //  * чтобы однозначно определить пользователя */
      // const token = jsonwebtoken.sign({ _id: user._id }, NODE_ENV === 'production'
      // ? JWT_SECRET : 'some-secret-key2', { expiresIn: '7d' });
      // res.send({ token });
    })
    .catch(next);
};

/** ТЕСТОВЫЙ !! @param req, GET /users
 * Получить всех пользователей
 * @param res */
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

/** @param req, GET /users/me (Чтение документов — R, метод: findById(req.params.id)
 * возвращает информацию о текущ пользователе (email и имя) - body: { name, email }
 * @return {Promise} */
module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundErr('Пользователь с таким ID не найден')) // 404
    .then((user) => res.send({ data: user }))
    .catch(next); // 401 - AuthoErr - from auth.js
};

/** обновляет информацию о пользователе - body: (name, email)
 * backend:: @param req, PATCH /users/me
 * user._id - user's ID */
module.exports.updateUserMe = (req, res, next) => {
  const { user: { _id } } = req; // @prop from auth
  const { name, email } = req.body;

  return User
    .findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send({
      data: user,
    })) // res.status(200) by default
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestErr(err.message)); // 400
      }
      return next(err);
    })
    .catch(next);
};
