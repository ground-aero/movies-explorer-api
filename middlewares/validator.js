/** доп. «слой» проверки данных. Валидировать приходящие на сервер запросы.
 * Тела запросов к серверу должны валидироваться до передачи обработки в контроллеры.
 * API должен возвращать ошибку, если запрос не соответствует схеме, которую мы определили. */
const { celebrate, Joi } = require('celebrate');
const { REGEX } = require('../utils/utils');

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
});

const validateUpdateMe = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().integer().required(),
    country: Joi.string().min(2).max(30).required(),
    director: Joi.string().min(2).max(30).required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().length(4).required(),
    description: Joi.string().min(2).max(250).required(),
    image: Joi.string().regex(REGEX).required(),
    trailerLink: Joi.string().regex(REGEX).required(),
    thumbnail: Joi.string().regex(REGEX).required(),
    nameRU: Joi.string().min(2).max(30).required(),
    nameEN: Joi.string().min(2).max(30).required(),
  }),
});

const validatdeDeleteMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24).hex().required(),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUpdateMe,
  validateCreateMovie,
  validatdeDeleteMovieId,
};
