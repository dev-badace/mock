import { connect } from "./db";
import { app } from "./app";

function sleep(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const PORT = process.env.PORT || 3002;

const ignite = async () => {
  while (true) {
    try {
      await connect();
      break;
    } catch (e) {
      console.log(e.message);
      console.log("Retrying for db connection");
      await sleep(500);
    }
  }
  app.listen(PORT, () => console.log(`Serve on Port ${PORT}`));
};

ignite();
