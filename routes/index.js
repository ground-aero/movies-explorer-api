const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');
// const { createUser, login } = require('../controllers/users');
const authorization = require('./authorization');
const users = require('./users');
const movies = require('./movies');

router.use(authorization);
router.use(users);
router.use(movies)

router.use('/*', (req, res, next) => next(new NotFoundError('такой маршрут не найден'))); // 404

module.exports = router;
