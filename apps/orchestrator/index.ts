import express from "express";
import logger from "./config/logger";
import * as dotenv from "dotenv";
import { env } from "./config/env";

dotenv.config();
const app = express();
const port = env.port;

app.use(express.json());

app.listen(port, () => {
  logger.info(`Orchestrator initialized at ${port}`);
});
