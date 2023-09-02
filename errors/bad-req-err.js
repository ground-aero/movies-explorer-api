class BadRequestErr extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.name = 'BadRequest';
    // this.name = this.constructor.name; // имя у ошибки будет то же
  }
}

module.exports = BadRequestErr;
