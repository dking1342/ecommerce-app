import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { data } from '../data.js';
import Product from '../models/productModels.js';
import cors from 'cors';

const productRouter = express.Router();

productRouter.get('/',cors(), expressAsyncHandler(async(req,res)=>{
    const products = await Product.find({});
    res.send({products: products})
}));

productRouter.get('/seed', cors(),expressAsyncHandler(async(req,res)=>{
    // await Product.deleteMany()
    const createdProducts = await Product.insertMany(data.products);
    res.send({products:createdProducts});
}))

productRouter.get('/:id',cors(), expressAsyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.send({product})
    } else{
        res.status(404).send({message:'Product not found'})
    }
}))


export default productRouter;