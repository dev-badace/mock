import { verify, sign } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { UserTokenPayload } from "../Types";

export class JWT {
  static verify(token: string) {
    return verify(token, JWT_SECRET) as UserTokenPayload;
  }

  static sign(token: UserTokenPayload) {
    return sign(token, JWT_SECRET);
  }
}
