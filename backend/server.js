import express from 'express';

// dataset
import {data} from './data.js';

// middleware
const app = express();



// routes
app.get('/',(req,res)=>{
    res.send("Server is ready");
})
app.get('/api/products',(req,res)=>{
    res.send(data.products)
})


const PORT = process.env.PORT || 5000
app.listen(PORT,()=> {
    console.log(`Server is listening to port ${PORT}`)
})