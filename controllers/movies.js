const Movie = require('../models/movie');
const BadRequestErr = require('../errors/bad-req-err');
const NotFoundErr = require('../errors/not-found-err');
// const ForbiddenErr = require('../errors/')

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
    nameEn
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
      nameEn
    }) // записыв _id в поле owner
      // Вернём записаные в базу данные
      .then((movie) => res.status(201).send({ data: movie })) /** В теле запроса на созд карточки
     передайте JSON-объект */
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestErr('Переданы некорректные данные при создании карточки'));
        } else {
          next(err);
        }
      })
  );
};

// # возвращает все сохранённые текущим пользователем фильмы
// backend:: GET /movies
const getMovies = (req, res, next) => {
  return (
    Movie.find({})
      .then((movies) => res.send({ data: movies }))
      .catch(next)
  )
};

// # удаляет сохранённый фильм по id
// backend:: DELETE /movies/_id
const deleteMovieId = (req, res, next) => {
  const { movieId } = req.params;
  return Movie.findById(movieId)
      .orFail(() => new NotFoundErr('No such movie ID'))
      .then((movie) => {
        if (movie.owner.toString() !== req.user._id) { // req.user._id - это
          return next(new Error('Нельзя удалить чужую карточку!'));
        }
        return movie.deleteOne()
          .then(() => res.send({ data: movie }));
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          next(new BadRequestErr('Невалидный ID карточки'));
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
