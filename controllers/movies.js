const Movie = require('../models/movie');
const BadRequestErr = require('../errors/bad-req-err');

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
// GET /movies
const getMovies = (req, res, next) => {
  return (
    Movie.find({})
      .then((movies) => res.send({ data: movies }))
      .catch(next)
  )
};

module.exports = {
  createMovie,
  getMovies,
};
