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
//
// const loginValidator = celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(4),
//   }),
// });
//
// const userIdValidator = celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().length(24).hex().required(),
//   }),
// });
//
// const updateProfileValidator = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//   }),
// });
//
// const updateAvatarValidator = celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string().regex(REGEX),
//   }),
// });
//
// const cardValidator = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30),
//     link: Joi.string().regex(REGEX),
//   }),
// });
//
// const cardIdValidator = celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().alphanum().length(24).hex(),
//   }),
// });

module.exports = {
  createUserValidator,
};
