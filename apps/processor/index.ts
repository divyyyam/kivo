import express from "express";
import cors from "cors";
import helmet from "helmet";
import env from "./config/env";
import logger from "./config/logger";

const app = express();
const port = env.port || 4000;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.listen(port, () => {
  logger.info("Processor initialized");
});