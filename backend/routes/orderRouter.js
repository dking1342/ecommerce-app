import express from 'express';
import cors from 'cors';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from './utils.js';

const orderRouter = express.Router();

orderRouter.post('/',cors(), isAuth, expressAsyncHandler(async(req,res)=>{
    if(req.body.orderItems.length === 0){
        res.status(400).send({message:'Cart is empty'})
    } else {
        const folder = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user:req.user._id
        });
        const createdOrder = await order.save();
        res.status(201).send({message:'New order created', order: createdOrder});
    }
}))

export default orderRouter;