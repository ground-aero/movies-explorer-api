class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    this.name = 'NotFound';
  }
}

module.exports = NotFoundErr;
