const router = require('express').Router();
const {
  createMovie,
  getMovies,
  deleteMovieId,
} = require('../controllers/movies');
const { createMovieValidator, deleteMovieIdValidator } = require('../middlewares/validator');

router.get('/movies', getMovies);
router.post('/movies', createMovieValidator, createMovie); // созд. польз-ля с переданными в теле name, email, pass
router.delete('/movies/:movieId', deleteMovieIdValidator, deleteMovieId);

module.exports = router;
