import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
// import logger from "./config/logger"
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(helmet());
const port = process.env.PORT;

app.get("/health", (req: Request, res: Response) => {
  return res.json({
    success: true,
    message: "Hooks api working",
  });
});

app.listen(port, () => {
  console.log("Hooks api running on ", port);
});

