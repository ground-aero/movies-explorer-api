const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'your "email" is required'],
    trim: true,
    lowercase: true,
    // validate: {
    //   validator(v) {
    //     return validator.isEmail(v);
    //   },
    //   message: 'invalid email',
    // },
    validate: [ validator.isEmail, 'invalid email' ],
  },
  password: {
    type: String,
    required: [true, 'your "password" is required'],
  },
  name: {
    type: String,
    required: true,
    minlength: [2, 'Min length of "name" is - 2 symbols'],
    maxlength: [30, 'Max length of "name" is - 30 symbols'],
    default: 'Your Name',
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema); // создаём модель и экспортируем
