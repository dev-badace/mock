import { ErrorMessage } from "../Types";

export const errorMap = (errors: { [key: string]: string }): ErrorMessage[] => {
  const reasons: ErrorMessage[] = [];
  if (Object.keys(errors).length >= 1) {
    for (let field in errors) {
      reasons.push({ message: errors[field], field });
    }
  }
  return reasons;
};
