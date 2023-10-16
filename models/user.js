const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const AuthoErr = require('../errors/autho-err');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name should be filled in'],
    minlength: [2, 'Min length of "name" is - 2 symbols'],
    maxlength: [30, 'Max length of "name" is - 30 symbols'],
    default: 'Your Name',
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'your "email" is required'],
    // trim: true,
    // lowercase: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'invalid email',
    },
    // validate: [validator.isEmail, 'invalid email'],
  },
  password: {
    type: String,
    required: [true, 'your "password" is required, minimum 4 characters'],
    select: false, // Так по умолчанию хеш пароля польз-ля не будет возвращаться из API
  },
}, { versionKey: false });

/** добавить метод findUserByCredentials схеме
 * у него 2 @params — почта и пароль */
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  // ToDo: 1)пытаемся найти user(-а) по почте
  return this.findOne({ email })
    .select('+password') // this — модель User
    .then((user) => {
      // user не нашёлся — отклоняем промис
      if (!user) {
        return Promise.reject(new AuthoErr('Вы ввели неправильный логин или пароль..'));
      }
      // Todo: если user нашёлся — то сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthoErr('Неправильный логин или пароль**'));
          }
          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema); // создаём модель и экспортируем
