import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from './../constants/productConstants';

export const listProducts = () => async(dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    try {
        const response = await fetch('http://localhost:5000/api/products/');
        const data = await response.json();
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:error.msg
        })
    }
}

export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST,
        payload: productId
    });
    try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        const data = await response.json();

        if(data.message !== 'Product not found'){
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: data
            })
        } else {
            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.message
        })
    }

}