export class APIError extends Error {
  public constructor (statusCode: number, message: string) {
    super(message);
    
    this.name = "APIError";
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}