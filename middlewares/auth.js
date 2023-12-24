/** Мидлвэр будет вызываться на каждый запрос,
 * проверять хедер определенных запросов на наличие авторизации, и вызывать next: */
require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
const AuthoErr = require('../errors/autho-err');
const { JWT_SECRET } = require('../config');

const { NODE_ENV } = process.env;

const auth = (req, res, next) => {
  /** ToDo: 1. достанем токен из заголовка
   *  взять заголовок authorization */
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthoErr('Необходима авторизация *'); // 401
  }

  /** достать jwt из хедера authorization, удалить Bearer из загол */
  const token = authorization.replace('Bearer ', '');
  console.log(token)
  // const token = authorization.split('Bearer ')[1];
  let payload;

  /** ToDo: 2. check token valid, and go next. If (valid) {go next}, else error
   *  Верификация jwt по секретному ключу */
  try {
    /** Токен верифицирован, пейлоуд извлечён.
     * проверить что jwt валидный с помощью библ jsonwebtoken */
    // console.log(jsonwebtoken)
    payload = jsonwebtoken.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    console.log(payload)
  } catch (error) {
    throw new AuthoErr('передан неверный логин или пароль -');
  }

  /** ToDo: 3. wright down the payload into req object — свойство req.user
   *  Так следующий мидлвэр сможет определить, кем этот запрос был выполнен */
  req.user = payload;
  return next(); // let the req go further
};

module.exports = auth;
