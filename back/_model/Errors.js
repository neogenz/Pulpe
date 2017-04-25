class ExtendableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

class AlreadyExistError extends ExtendableError {
}

class NotFoundError extends ExtendableError{
}

module.exports.AlreadyExistError = AlreadyExistError;
module.exports.NotFoundError = NotFoundError;
