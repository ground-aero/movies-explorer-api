/** Централизованный обработчик ошибок */
const errorsHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = status === 500 ? 'Произошла ошибка на сервере' : err.message;
  res.status(status).send({ message });
  next();
};

module.exports = errorsHandler;
