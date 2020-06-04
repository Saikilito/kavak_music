import { App } from "./config";

import dotenv from "dotenv";
import "reflect-metadata";

const main = async () => {
  dotenv.config();
  const app = new App();
  await app.listen();
};

main();