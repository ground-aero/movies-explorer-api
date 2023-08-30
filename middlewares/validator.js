/** доп. «слой» проверки данных. Валидировать приходящие на сервер запросы.
 * Тела запросов к серверу должны валидироваться до передачи обработки в контроллеры.
 * API должен возвращать ошибку, если запрос не соответствует схеме, которую мы определили. */
const { celebrate, Joi } = require('celebrate');

const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
});

const updateMeValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

// const movieIdValidator = celebrate({
//   params: Joi.object().keys({
//     movieId: Joi.string().length(24).hex().required(),
//   }),
// });

// const movieIdValidator = celebrate({
//   params: Joi.object().keys({
//     movieId: Joi.string().alphanum().length(24).hex(),
//   }),
// });

// const updateAvatarValidator = celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string().regex(REGEX),
//   }),
// });
//
// const movieValidator = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30),
//     link: Joi.string().regex(REGEX),
//   }),
// });
//

module.exports = {
  createUserValidator,
  loginValidator,
  updateMeValidator,
};
