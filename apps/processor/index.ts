import express from "express"
import cors from "cors"
import helmet from "helmet"
import * as dotenv from 'dotenv';
import {createLogger} from "@repo/logger"

const app = express()
dotenv.config()
const port = process.env.PORT || 4000
app.use(express.json())
const logger = createLogger({
    name:"processor"
})

app.listen(port,()=>{
    logger.info("Processor initialized")
})