import { ErrorMessage } from "../Types";
import { errorMap } from "../utils/errorUtils";

export abstract class CustomError extends Error {
  constructor(message: string) {
    super(message);
  }

  abstract status: number;

  abstract serialize(...args: any): ErrorMessage[];

  errorsMap(errors: { [key: string]: string }) {
    return errorMap(errors);
  }
}
