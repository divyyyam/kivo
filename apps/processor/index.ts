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

//core logic => get a task (from kafka) and perform it (configure a canonical style abstract extensible pattern that explains the procesor what to do when a task arrives)
app.listen(port, () => {
  logger.info(`Processor initialized ${port}`);
});

