export class DatabaseConnectionError extends Error {
  statusCode = 500;
  reason = 'Error connecting to Database';
  constructor() {
    super();

    // Only beacuse we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeError() {
    return [{ message: this.reason }];
  }
}
