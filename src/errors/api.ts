export class APIError extends Error {
  public constructor (public statusCode: number, public message: string) {
    super(message);
    
    this.name = "APIError";

    Error.captureStackTrace(this, this.constructor);
  }
}