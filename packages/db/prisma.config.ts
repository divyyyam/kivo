 
import { defineConfig } from "prisma/config";
import dbUrl from "./config/env";
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: dbUrl,
  },
});
