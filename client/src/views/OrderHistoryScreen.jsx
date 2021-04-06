import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import Loading from './../components/Loading';
import MessageBox from './../components/MessageBox';

const OrderHistoryScreen = (props) => {
    const orderMineList = useSelector(state => state.orderMineList)
    const { loading, orders, error } = orderMineList;

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(listOrderMine());
    },[dispatch])

    return (
        <div>
            <h1>Order History</h1>
            {
                loading 
                    ? <Loading></Loading>
                    : error
                    ? <MessageBox variant="danger">{error}</MessageBox>
                    : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map((order, i)=>(
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt}</td>
                                            <td>{order.totalPrice.toFixed(2)}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0,10) : 'No'}</td>
                                            <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : 'No'}</td>
                                            <td>
                                                <button 
                                                    className="small" 
                                                    type="button" 
                                                    onClick={()=> props.history.push(`/order/${order._id}`)}
                                                >
                                                    Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )


            }
        </div>
    )
}

export default OrderHistoryScreen
