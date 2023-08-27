const router = require('express').Router();
const {
  createMovie,
} = require('../controllers/movies');

router.post('/movies', createMovie); // создаёт польз-ля с переданными в теле name, email, pass

module.exports = router;
