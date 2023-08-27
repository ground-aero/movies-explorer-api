const router = require('express').Router();
const { createUser, login } = require('../controllers/users');

router.post('/signup', createUser); // создаёт польз-ля с переданными в теле name, email, pass
router.post('/signin', login);

module.exports = router;
