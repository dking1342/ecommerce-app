import dotenv from 'dotenv';
dotenv.config({path:'./config.env'})

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// middleware
const app = express();
app.use(cors())

// connection to the mongodb
console.log(process.env.MONGO_URI)
const conn = '' || 'mongodb://localhost';
const options = {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}
mongoose.connect(conn,options)

// Router
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';


// routes
app.use('/api/users', userRouter)
app.use('/api/products',productRouter)

app.get('/', cors(),(req,res)=>{
    res.send("Server is ready");
})

// error handler for routes
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message});
})


const PORT = process.env.PORT || 5000
app.listen(PORT,()=> {
    console.log(`Server is listening to port ${PORT}`)
})