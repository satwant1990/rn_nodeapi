import express from 'express';
import dotenv from 'dotenv'
import connectDatabase from './config/database.js';
import cors from 'cors';
import {errorMidldleware} from './middleware/error.js'
import cookieParser from 'cookie-parser'



dotenv.config({path:"backend/config/config.env"});
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser());

//importing routes
import userRoutes from './routes/userRoute.js'
app.use('/api/v1/',userRoutes);

import postRoutes from './routes/postRoute.js'
app.use('/api/v1/',postRoutes);

connectDatabase()


export default app;
app.use(errorMidldleware)