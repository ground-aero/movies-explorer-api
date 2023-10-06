const mongoose = require('mongoose');
const validator = require('validator');
// const { isURL } = require('../utils/utils');

const movieSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId, // сохр идентифик. фильма
    ref: 'user', // ссылка на модель пользователя
    required: true,
  },
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
    validate: { // опишем свойство validate
      validator(v) { // validator - функция проверки данных. v - значение свойства image
        return validator.isURL(v); // если url некорректный (?), вернётся false
      },
      message: 'не является валидной URL ссылкой!',
    // когда validator вернёт false, вернется это сообщение
    },
    default: 'https://www.mos.ru/upload/newsfeed/newsfeed/GL(188842).jpg',
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
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    default: 'Название фильма',
  },
  nameEN: {
    type: String,
    required: true,
    default: 'Film name',
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema); // созд. модель и экспортируем
