import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
  statusCode = 400;
  
  constructor(public errors: ValidationError[]) {
    super();

    // Only beacuse we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
