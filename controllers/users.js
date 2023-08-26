require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');
// const { NotFoundErr } = require('../errors/not-found-err');
const { ConflictErr } = require('../errors/conflict-err');
const { BadRequestErr } = require('../errors/bad-req-err');

/** back: POST /signup
 *  front: POST /auth/local/register
 * Создаеть польз-ля с переданными в body: { name, email, password }
 * @return {Promise} */
const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body; // получим из объекта req: имя,email,passw
  // console.log(req.body);

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    // вернем/созд док на осн приш. данных. Вернём записаные в базу данные
    .then((user) => res.status(201).send({
      data: {
        _id: user._id,
        name,
        email,
      },
    }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictErr('Такой логин-емейл уже существует! /409'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestErr('Переданы некорректные данные при создании пользователя'));
      }
      return next(err);
    })
    .catch(next);
};

/** контроллер login, получает из запроса почту и пароль и проверяет их
 * backend:  POST /signin
 * frontend: POST /auth/local */
const login = (req, res, next) => {
  const { email, password } = req.body;
  // ToDo: 1)find user, 2)check pass.., 3)return jwt & user
  return User.findUserByCredentials(email, password)
    .then((user) => {
      /** библ. jsonwebtoken, вызовом метода .sign создаем токен.
       * Методу sign передаем 2 аргумента: пейлоуд токена и секретный ключ подписи.
       * Пейлоуд токена — зашифрованный в строку объект пользователя, его достаточно,
       * чтобы однозначно определить пользователя */
      const token = jsonwebtoken.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key2', { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch(next);
};

/** @param req, GET /users/me
 * возвращает информацию о текущ пользователе (email и имя) - body: { name, email }
 * @return {Promise} */
const getUserMe = (req, res, next) => {
  // ToDo: check token, getUser from DB, return username & email
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    res.status(401).send({ message: 'Необходима авторизация' });
  }
  // должны получить токен из authorization хедера:
  let payload;
  const token = authorization.replace('Bearer ', '');
  // Проверить, валиден ли токен/jwt:
  try {
    // payload = jsonwebtoken.verify(token, 'some-secret-key');
    payload = jsonwebtoken.verify(token, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key2');
    // res.send(payload); // в payload хранится: _id, iat,exp
  } catch (err) {
    res.status(401).send({ message: 'Необходима авторизация' });
  }

  /** Залезть в BD и получить пользователя */
  User
    .findById(payload._id)
    .orFail(() => res.status(404).send({ message: 'Пользователь не найден' }))
    .then((user) => res.status(200).send({
      data: user,
    }))
    .catch(next);
};

/** обновляет информацию о пользователе - body: (name, email)
 * backend:: @param req, PATCH /users/me
 * user._id - user's ID */
const updateUserMe = (req, res, next) => {
  const { _id } = req.user;
  const { name, email } = req.body;

  return User
    .findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send({
        data: user
      })) // res.status(200) по дефолту
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestErr(err.message));
      }
      return next(err);
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getUserMe,
  updateUserMe,
};
