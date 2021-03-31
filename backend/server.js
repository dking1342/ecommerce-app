
import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import cors from 'cors';

// dotenv config
dotenv.config()

// middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// connection to the mongodb
const conn = process.env.MONGO_URI || 'mongodb://localhost';
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

app.get('/', cors(),(req,res)=> res.send("Server is ready"))

// error handler for routes
app.use((err,req,res,next)=> res.status(500).send({message:err.message}))


const PORT = process.env.PORT || 5000
app.listen(PORT,()=> {
    console.log(`Server is listening to port ${PORT}`)
})