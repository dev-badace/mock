import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";

export const requireAuth = (req: Request, _: Response, next: NextFunction) => {
  if (!req.user) throw new NotAuthorizedError();

  next();
};
