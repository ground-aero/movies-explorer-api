const router = require('express').Router();
const {
  createMovie,
  getMyMovies,
  deleteMovieId,
} = require('../controllers/movies');
const { validateCreateMovie, validatdeDeleteMovieId } = require('../middlewares/validator');

router.get('/movies', getMyMovies);
router.post('/movies', validateCreateMovie, createMovie); // созд. польз-ля с переданными в теле name, email, pass
router.delete('/movies/:movieId', validatdeDeleteMovieId, deleteMovieId);

module.exports = router;
