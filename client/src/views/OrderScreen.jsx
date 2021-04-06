import React, { useEffect, useState } from 'react';
import {PayPalButton} from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { detailsOrder, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from './../constants/orderConstants';

const OrderScreen = (props) => {
    const [sdkReady, setSdkReady]=useState(false);
    const orderId = props.match.params.id;
    const orderDetails = useSelector(state=> state.orderDetails);
    const { order, loading, error } = orderDetails;
    const orderPay = useSelector(state=> state.orderPay);
    const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;

    const dispatch = useDispatch();
    useEffect(()=>{
        const addPayPalScript = async () => {
            const response = await fetch('/api/config/paypal');
            const data = await response.json();

            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data.message}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script);
        }
        if(!order || successPay || (order && order._id !== orderId)){
            dispatch({
                type: ORDER_PAY_RESET
            })
            dispatch(detailsOrder(orderId))
        } else {
            if(!order.isPaid){
                if(!window.paypal){
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    },[dispatch, orderId, order, sdkReady,errorPay, successPay])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order,paymentResult))
    }
      
    if(loading){
        return(
            <Loading></Loading>
        )
    } else if (error) {
        return (
            <MessageBox variant="danger">{error}</MessageBox>
        )
    } else {
        return (
            <div>
                <h1>Order {order._id}</h1>
                <div className="row top">
                    <div className="col-2">
                        <ul>
                            <li>
                                <div className="card card-body card-body-w100">
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong> {order.shippingAddress.fullName} <br />
                                        <strong>Address: </strong> {order.shippingAddress.address}, 
                                        {order.shippingAddress.city}, 
                                        {order.shippingAddress.postalCode}, 
                                        {order.shippingAddress.country}
                                    </p>
                                    {
                                        order.isDelivered 
                                            ? <MessageBox variant="success">{order.deliveredAt}</MessageBox>
                                            : <MessageBox variant="danger">Not Delivered</MessageBox>
                                    }
                                </div>
                            </li>
                            <li>
                                <div className="card card-body card-body-w100">
                                    <h2>Payment</h2>
                                    <p>
                                        <strong>Method: </strong> {order.paymentMethod} <br />
                                    </p>
                                    {
                                        order.isPaid
                                            ? <MessageBox variant="success">{order.paidAt}</MessageBox>
                                            : <MessageBox variant="danger">Not Paid</MessageBox>
                                    }
                                </div>
                            </li>
                            <li>
                                <div className="card card-body card-body-w100">
                                    <h2>Order Items</h2>
                                    <ul>
                                        {
                                            order.orderItems.map((item,i)=>(
                                                <li key={i}>
                                                    <div className="row">
                                                        <div>
                                                            <img src={item.image} alt={item.name} className="small"/>
                                                        </div>
                                                    </div>
                                                    <div className="min-15">
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </div>
                                                    <div>{item.qty} x ${item.price} = ${item.qty * item.price}</div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li>
                                    <h2>Order Summary</h2>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Items</div>
                                        <div>${order.itemsPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Shipping</div>
                                        <div>${order.shippingPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Tax</div>
                                        <div>${order.taxPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div><strong>Order Total</strong></div>
                                        <div>${order.totalPrice.toFixed(2)}</div>
                                    </div>
                                </li>
                                {
                                    !order.isPaid && (
                                        <li>
                                            {
                                                !sdkReady ? (
                                                    <Loading></Loading>
                                                ) : 
                                                (
                                                    <>
                                                        {
                                                            errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>
                                                        }
                                                        {
                                                            loadingPay && <Loading></Loading>
                                                        }
                                                        <PayPalButton
                                                            amount={order.totalPrice}
                                                            onSuccess={successPaymentHandler}
                                                        >
                                                        </PayPalButton>
                                                    </>
                                                )
                                            }
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    
}

export default OrderScreen
