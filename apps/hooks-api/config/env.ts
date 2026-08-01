import * as dotenv from "dotenv";

dotenv.config();
const env = {
  port: process.env.PORT as string,
};

export default env;
