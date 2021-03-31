import dotenv from 'dotenv';
dotenv.config({path:'./config.env'})

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// dataset 
import {data} from './data.js';

// middleware
const app = express();
app.use(cors())

// connection to the mongodb
console.log(process.env.MONGO_URI)
const conn = process.env.MONGO_URI || 'mongodb://localhost';
const options = {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}
mongoose.connect(conn,options)

// Router
import userRouter from './routes/userRouter.js';
app.use('/api/users', userRouter)


// routes
app.get('/api/products',cors(),(req,res)=>{
    res.json(data.products)
})
app.get('/', cors(),(req,res)=>{
    res.send("Server is ready");
})
app.get('/products/:id',cors(),(req,res)=>{
    const product = data.products.find(item=> item._id === req.params.id);
    if(product){
        res.send(product)
    } else {
        res.status(404).send({message:'Product not found'})
    }
})

// error handler for routes
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message});
})


const PORT = process.env.PORT || 5000
app.listen(PORT,()=> {
    console.log(`Server is listening to port ${PORT}`)
})