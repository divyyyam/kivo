import express, { Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { createLogger } from "@repo/logger";
import env from "./config/env";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(helmet());

const logger = createLogger({
  name: "hooks-api",
});
app.get("/health", (res: Response) => {
  return res.json({
    success: true,
    message: "Hooks api working",
  });
});

app.listen(env.port, () => {
  logger.info(`Hooks api active on  http://localhost:${env.port}`);
});
