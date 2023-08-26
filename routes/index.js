const router = require('express').Router();
const { createUser } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');

router.post('/signup', createUser);

router.use('/users', require('./users'));

router.use('*', (req, res, next) => next(new NotFoundError())); // 404

module.exports = router;
