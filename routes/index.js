const router = require('express').Router();
const users = require('./users');
// const { createUser } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');

router.use(users);

router.use('/*', (req, res, next) => next(new NotFoundError('такой маршрут не найден'))); // 404

module.exports = router;
