import { Router } from "express";
import { BadRequestError } from "../../errors/BadRequestError";
import { requireAuth } from "../../middlewares/requireAuth";
import { User } from "../../models/User";

export const userRouter = Router();

userRouter.get("/me", requireAuth, (req, res) => {
  const user = User.findOne({ googleId: req.user.id });
  if (!user) throw new BadRequestError("User not Found");

  res.status(200).send({ user });
});
