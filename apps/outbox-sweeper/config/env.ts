import * as dotenv from "dotenv"

dotenv.config()

export const env = {
    port:process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT,10):4002
}

