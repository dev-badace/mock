import mongoose from "mongoose";

export const connect = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bond-db", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        console.log("db connected");
        resolve();
      })
      .catch((e) => reject(e));
  });
};
