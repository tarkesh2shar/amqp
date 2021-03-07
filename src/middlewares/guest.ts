import { Request, Response, NextFunction } from "express";
import createError                         from "http-errors";

export const guest = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.user) {
    return next(createError(401, "Unauthorized"));
  }
  next();
};