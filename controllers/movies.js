const Movie = require('../models/movie');
const BadRequestErr = require('../errors/bad-req-err');
const NotFoundErr = require('../errors/not-found-err');
const ForbiddenErr = require('../errors/forbidden-err');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEn,
  } = req.body;
  const { _id } = req.user;
  // console.log(_id)
  // debugger
  return (
    Movie.create({
      owner: _id,
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEn,
    }) // записыв _id в поле owner
      // Вернём записаные в базу данные
      .then((movie) => res.status(201).send({ data: movie })) /** В теле запроса на созд карточки
     передайте JSON-объект */
      .catch((err) => {
        console.log(err);
        if (err.name === 'ValidationError' || err.name === 'ValidatorError') {
          next(new BadRequestErr('Переданы некорректные данные при создании карточки фильма')); // 400
        } else {
          next(err);
        }
      })
  );
};

// # возвращает все сохранённые текущим пользователем фильмы
// backend:: GET /movies
const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

// # удаляет сохранённый фильм по id
// backend:: DELETE /movies/_id
const deleteMovieId = (req, res, next) => {
  const { movieId } = req.params;
  return Movie.findById(movieId)
    .orFail(() => new NotFoundErr('Such movie ID not found')) // 404
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) { // req.user._id
        return next(new ForbiddenErr('You\'re not authorized to delete this film!')); // 403 - Forbidden
      }
      return movie.deleteOne()
        .then(() => res.send({ data: movie }));
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestErr('Such movie ID not valid')); // 400
      } else {
        next(err);
      }
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovieId,
};
