const router = require('express').Router();
const { createUser, login, getUserMe } = require('../controllers/users');

// router.post('/', (req, res) => {
// получим из объекта запроса имя и описание пользователя
//   const { name, email, password } = req.body;
//   User.create({ name, email, password }) // созд. документ на основе пришедших данных
//     .then(user => res.status(201).send({
//       data: {
//         _id: user._id,
//         name,
//         email,
//       },
//     })) // вернём записанные в Базу данные
//     .catch(err => {
//       if (err.code === 11000) {
//         return next(new ConflictErr('Такой логин/емейл уже существует! (409)'));
//       }
//       if (err.name === 'ValidationError') {
//         return next(new BadRequestErr('Переданы некорректные данные при создании пользователя'));
//       }
//       return next(err);
//     });
// });
router.post('/signup', createUser); // создаёт польз-ля с переданными в теле name, email, pass
router.post('/signin', login);

router.get('/users/me', getUserMe); // в '/me' итак передается authorization header, поэтому не нужно 2-й раз его защищать

module.exports = router;
