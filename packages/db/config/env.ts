import dotenv from "dotenv"
import path from "path"
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});
const dbUrl = process.env.DATABASE_URL as string
if (!dbUrl) {
    throw new Error("DATABASE_URL not defined, verify the environment")
}
export default dbUrl