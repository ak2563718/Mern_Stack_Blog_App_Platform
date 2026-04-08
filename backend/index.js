import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { dbconnect } from "./configuration/dbconnection.js"
import helmet from 'helmet'
import { errorMiddleware } from './middlewares/errorMiddleware.js'
import userRoute from './routes/userRoute.js'
import blogRoute from './routes/blogRoute.js'
import profileRoute from './routes/profileRoute.js'
import commentRoute from './routes/commentRoute.js'
import passport from './configuration/passport.js'
import path from 'path'

const app = express();
dotenv.config();
const _dirname = path.resolve();
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
}))
app.use(cookieParser())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(passport.initialize())

app.use('/api',userRoute)
app.use('/api',blogRoute)
app.use('/api',profileRoute)
app.use('/api',commentRoute)


app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get(/.*/,(_, res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})

app.use(errorMiddleware)
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;
app.listen(port,async()=>{
   await dbconnect(uri)
    console.log(`server is running at Port ${port}`)
})


