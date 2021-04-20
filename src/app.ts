import express from "express";
import { NotFoundError } from "./errors/NotFoundError";
import { currentUser } from "./middlewares/currentUser";
import { errorHandler } from "./middlewares/errorHandler";
import { authRouter } from "./routes/authentication/authRoutes";
import { userRouter } from "./routes/userRoutes/userRoutes";
const app = express();

// app.options("*", (_, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.status(200).send();
// });

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, DELETE");
  next();
});

app.use(express.json());
app.use(currentUser);

app.use(userRouter);
app.use("/api/auth", authRouter);

app.all("*", async (_, __) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
