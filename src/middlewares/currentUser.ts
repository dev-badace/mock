import { Request, Response, NextFunction } from "express";
import { JWT } from "../services/Jwt";
import { UserTokenPayload } from "../Types";

declare global {
  namespace Express {
    interface Request {
      user: UserTokenPayload;
    }
  }
}

export const currentUser = (req: Request, _: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) return next();

  const token = header.split("Bearer ")[1];
  if (!token) return next();

  const decodedToken = JWT.verify(token);
  req.user = decodedToken;

  next();
};
