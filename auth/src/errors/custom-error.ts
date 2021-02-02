export abstract class CustomError extends Error {
  abstract statusCode: number;

  // Receives a message for logging usages
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  // It makes sure that ever class that extends this abstract class implements this method
  abstract serializeErrors(): { message: string; field?: string }[];
}
