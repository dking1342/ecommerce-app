import { CART_EMPTY } from "../constants/cartConstants";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/orderConstants"

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

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({
        type:ORDER_DETAILS_REQUEST,
        payload:orderId
    })
    try {
        const { userSignin: {userInfo} } = getState(); 
        const options = {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
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
            body: null // body data type must match "Content-Type" header
          }
        const response = await fetch(`/api/orders/${orderId}`,options);
        const data = await response.json();

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.message
        })
    }
}

export const payOrder = (order,paymentResult) => async (dispatch,getState) => {
    dispatch({
        type:ORDER_PAY_REQUEST,
        payload: { order, paymentResult}
    })
    try {
        const { userSignin:{userInfo}} = getState();
        const options = {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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
            body: JSON.stringify(paymentResult) // body data type must match "Content-Type" header
          }
          const response = await fetch(`/api/orders/${order._id}/pay`,options);
          const data = await response.json();

          dispatch({
              type:ORDER_PAY_SUCCESS,
              payload:data,
          })
    } catch (error) {
        dispatch({
            type:ORDER_PAY_FAIL,
            payload: error.message
        })
    }
}

export const listOrderMine = () => async(dispatch, getState) => {
    dispatch({
        type:ORDER_MINE_LIST_REQUEST
    })
    try {
        const { userSignin:{userInfo}} = getState();
        const options = {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
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
            body: null // body data type must match "Content-Type" header
          }
        const response = await fetch('/api/orders/mine',options);
        const data = await response.json();

        if(data.message){
            dispatch({
                type:ORDER_MINE_LIST_FAIL,
                payload: data.message
            })    
        } else {
            dispatch({
                type:ORDER_MINE_LIST_SUCCESS,
                payload:data
            })
        }
    } catch (error) {
        dispatch({
            type:ORDER_MINE_LIST_FAIL,
            payload: error.message
        })
    }
}