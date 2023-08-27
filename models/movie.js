const mongoose = require('mongoose');
const validator = require('validator');
// const { isURL } = require('../utils/utils');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    // validate: { // опишем свойство validate
    //   validator(v) { // validator - функция проверки данных. v - значение свойства age
    //     return validator.isURL(v); // если возраст меньше 18, вернётся false
    //   },
    //   message: 'Вам должно быть больше 18 лет!',
    // когда validator вернёт false, будет использовано это сообщение
    // },
    validate: {
      validator: (v) => validator.isURL(v), // join('')
      message: 'не является валидной URL ссылкой!',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'не является валидной URL ссылкой!',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'не является валидной URL ссылкой!',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, // сохр идентифик. фильма
    ref: 'user', // ссылка на модель пользователя
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    default: 'Film name',
  },
  nameEn: {
    type: String,
    required: true,
    default: 'Film name',
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema); // создаём модель и экспортируем
