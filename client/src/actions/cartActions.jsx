import { CART_ADD_ITEM } from "../constants/cartConstants";

export const addToCart = (productId, qty) => async(dispatch, getState) => {
    try {
        const response = await fetch(`/products/${productId}`);
        const data = await response.json();
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                product: data._id,
                qty,
            }
        })
    } catch (error) {
        
    }
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
} 