import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.status).send({
      errors: err.serialize(),
    });
  }

  console.log(err);
  return res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
};
