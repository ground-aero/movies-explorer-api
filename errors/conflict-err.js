class ConflictErr extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
    this.name = 'ConflictError';
  }
}

module.exports = ConflictErr;
