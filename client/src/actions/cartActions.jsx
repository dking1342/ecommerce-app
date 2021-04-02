import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const addToCart = (productId, qty) => async(dispatch, getState) => {
    try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                name: data.product.name,
                image: data.product.image,
                price: data.product.price,
                countInStock: data.product.countInStock,
                product: data.product._id,
                qty,
            }
        })
    } catch (error) {
        
    }
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
} 

export const removeFromCart = (productId) => async(dispatch,getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: productId
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}

export const saveShippingAddress = (data) => async(dispatch,getState) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    localStorage.setItem('shippingAddress',JSON.stringify(data))
}