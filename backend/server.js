import express from 'express';
import cors from 'cors';

// dataset
import {data} from './data.js';

// middleware
const app = express();
app.use(cors())


// routes
app.get('/', cors(),(req,res)=>{
    res.send("Server is ready");
})
app.get('/api/products',cors(),(req,res)=>{
    res.json(data.products)
})



const PORT = process.env.PORT || 5000
app.listen(PORT,()=> {
    console.log(`Server is listening to port ${PORT}`)
})