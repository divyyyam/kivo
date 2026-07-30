import dotenv from "dotenv"
import path from "path"
import { defineConfig } from "prisma/config"
import dbUrl from "./env"

dotenv.config({
    path:path.resolve(process.cwd(),".env")
})

export default defineConfig({
    schema:"prisma/schema.prisma",
    migrations:{
        path:"prisma/migrations"
    },
    datasource:{
        url:dbUrl
    }
})