import { CART_EMPTY } from "../constants/cartConstants";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../constants/orderConstants"

export const createOrder = (order) => async(dispatch,getState)=>{
    dispatch({
        type:ORDER_CREATE_REQUEST,
        payload:order
    })
    try {
        const { userSignin:{userInfo}} = getState();
        const options = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userInfo.token}`
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(order) // body data type must match "Content-Type" header
          }
        const response = await fetch('/api/orders/',options);
        const data = await response.json();

        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload:data.order
        })
        dispatch({
            type:CART_EMPTY,
        })
        localStorage.removeItem('cartItems');
    } catch (error) {
        console.log('error',error)
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload: error.message
        })
    }
}