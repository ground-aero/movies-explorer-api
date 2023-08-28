const router = require('express').Router();
const {
  createMovie,
} = require('../controllers/movies');
const auth = require('../middlewares/auth');

router.post('/movies', auth, createMovie); // создаёт польз-ля с переданными в теле name, email, pass

module.exports = router;
