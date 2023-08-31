const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('../middlewares/validator');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

router.post('/signup', validateCreateUser, createUser); // создаёт польз-ля с переданными в теле name, email, pass
router.post('/signin', validateLogin, login);

router.use(auth);
router.use(usersRoutes);
router.use(moviesRoutes)

router.use('/*', (req, res, next) => next(new NotFoundError('такой маршрут не найден'))); // 404

module.exports = router;
