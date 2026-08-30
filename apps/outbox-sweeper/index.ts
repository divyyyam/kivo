import express, {Response} from  "express"
import { env } from "./config/env"
import { logger } from "./config/logger"


const app = express()
const port = env.port


app.get("/health",(res:Response)=>{
    return res.status(200).json({
        sucess:true,
        message:"Outbox sweeper api functional"
    })
})

app.listen(port,()=>{
    logger.info(`Outbox sweeper working on port${port}`)
})