import { Router } from "express";
import { User } from "../../models/User";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../../config";

export const authRouter = Router();

authRouter.post("/google", async (req, res) => {
  const { id, email, profileUrl } = req.body;
  const user = User.build({
    googleId: id,
    email,
    profileUrl,
  });
  await user.save();
  res.send({
    user,
    token: sign({ id }, JWT_SECRET),
  });
});
