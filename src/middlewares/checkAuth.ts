import { Request, Response, NextFunction } from "express";
import passport from "passport";

import { APIError } from "../errors/api";

const handleAuthResponse =
  (req: Request, res: Response, next: NextFunction) =>
  async (err, user, info) => {
    if (err || info || !user) {
      next(new APIError(403, "Unauthorized."));
    }

    req.login(user, { session: false }, next);
  };

const middleware = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate(
    "jwt",
    { session: false },
    handleAuthResponse(req, res, next)
  )(req, res, next);

export default middleware;
