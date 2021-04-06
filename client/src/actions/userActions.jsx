import { 
    USER_SIGNIN_FAIL, 
    USER_SIGNIN_REQUEST, 
    USER_SIGNIN_SUCCESS, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS, 
    USER_SIGNOUT,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL
} from "../constants/userConstants"

export const register = (name,email,password) => async(dispatch) => {
    dispatch({
        type:USER_REGISTER_REQUEST,
        payload:{email,password}
    })
    try {
        const options = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({name,email,password}) // body data type must match "Content-Type" header
          }
        const response = await fetch('/api/users/register',options)
        const data = await response.json();
        console.log(data)

        if(data.message){
            dispatch({
                type:USER_REGISTER_FAIL,
                payload:
                     data.message,
            })    
        } else {
            dispatch({
                type:USER_REGISTER_SUCCESS,
                payload: data
            })
            dispatch({
                type:USER_SIGNIN_SUCCESS,
                payload:data
            })
            localStorage.setItem('userInfo',JSON.stringify(data))
        }

    } catch (error) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload: error.message,
        })
    }
}

export const signin = (email,password) => async(dispatch) => {
    dispatch({
        type:USER_SIGNIN_REQUEST,
        payload:{email,password}
    })
    try {
        const options = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({email,password}) // body data type must match "Content-Type" header
          }
        const response = await fetch('/api/users/signin',options)
        const data = await response.json();

        if(data.message === 'Invalid email or password'){
            dispatch({
                type:USER_SIGNIN_FAIL,
                payload:
                     data.message,
            })    
        } else {
            dispatch({
                type:USER_SIGNIN_SUCCESS,
                payload: data
            })
            localStorage.setItem('userInfo',JSON.stringify(data))
        }

    } catch (error) {
        dispatch({
            type:USER_SIGNIN_FAIL,
            payload:
                 error.message,
        })
    }
}

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');    
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({
        type: USER_SIGNOUT
    })
}

export const detailsUser = (userId) => async(dispatch,getState)=>{
    dispatch({
        type:USER_DETAILS_REQUEST
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
        const response = await fetch(`/api/users/${userId}`, options);
        const data = await response.json();

        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload: data
        })        
    } catch (error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload: error.message
        })
    }
}