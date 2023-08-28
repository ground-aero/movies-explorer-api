const router = require('express').Router();
const {
  createMovie,
  getMovies,
  deleteMovieId,
} = require('../controllers/movies');
const auth = require('../middlewares/auth');

router.post('/movies', auth, createMovie); // создаёт польз-ля с переданными в теле name, email, pass
router.get('/movies', auth, getMovies);
router.delete('/movies/:movieId', auth, deleteMovieId);

module.exports = router;
