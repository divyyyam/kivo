
import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "./generated/prisma";
import dbUrl from './config/env';
const connectionString = dbUrl //Prisma pg requires  "connectionString"
const adapter = new PrismaPg({
    connectionString
})

const prisma = new PrismaClient({
    adapter
})

export default prisma