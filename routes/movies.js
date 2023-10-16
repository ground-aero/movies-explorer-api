const router = require('express').Router();
const {
  createMovie,
  getMyMovies,
  deleteMovieId,
} = require('../controllers/movies');
const { validateCreateMovie, validatdeDeleteMovieId } = require('../middlewares/validator');

router.get('/movies', getMyMovies);
router.post('/movies', validateCreateMovie, createMovie);
router.delete('/movies/:movieId', validatdeDeleteMovieId, deleteMovieId); // удаляет фильм с Сервера

module.exports = router;
