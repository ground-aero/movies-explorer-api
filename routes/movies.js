const router = require('express').Router();
const {
  createMovie,
  getMovies,
  deleteMovieId,
} = require('../controllers/movies');

router.post('/movies', createMovie); // созд. польз-ля с переданными в теле name, email, pass
router.get('/movies', getMovies);
router.delete('/movies/:movieId', deleteMovieId);

module.exports = router;
