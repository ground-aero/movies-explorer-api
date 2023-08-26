const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'invalid email',
    },
    // validate: [validator.isEmail, 'invalid email'],
  },
  password: {
    type: String,
    required: [true, 'your "password" is required'],
    select: false, // Так по умолчанию хеш пароля польз-ля не будет возвращаться из базы
  },
}, { versionKey: false });

/** добавим метод findUserByCredentials схеме
 * у него 2 параметра — почта и пароль */
// userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
//   // ToDo: 1)пытаемся найти user(-а) по почте
//   return this.findOne({ email }).select('+password') // this — это модель User
//     .then((user) => {
//       // user не нашёлся — отклоняем промис
//       if (!user) {
//         return Promise.reject(new AuthoErr('Неправильные почта или пароль..'));
//       }
//       // Todo: если user нашёлся — то сравниваем хеши
//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             return Promise.reject(new AuthoErr('Неправильные почта или пароль***'));
//           }
//           return user; /** теперь user доступен */
//         });
//     });
// };

module.exports = mongoose.model('user', userSchema); // создаём модель и экспортируем
