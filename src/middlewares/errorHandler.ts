import { Request, Response, NextFunction } from "express";
import { isCelebrateError } from "celebrate";

import { APIError } from "../errors/api";

export const validation = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(isCelebrateError(err) && err.details.has("body"))) return next(err);

  const validationError = err.details.get("body");

  const errors = validationError.details.reduce((groupedErrors, error) => {
    const group = error.path.join(".");

    groupedErrors[group] ||= error.message;

    return groupedErrors;
  }, {});

  res.status(400).json({
    message: "Validation failed.",
    errors,
  });
};

export const api = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(err instanceof APIError)) return next(err);

  res.status(err.statusCode).json({
    message: err.message,
  });
};
