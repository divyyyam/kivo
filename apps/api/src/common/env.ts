import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 4000,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
};
