import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingAddressScreen = (props) => {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector(state=> state.cart);
    const { shippingAddress } = cart;
    if(!userInfo){
        props.history.push('/signin')
    }
    const [fullName, setFullName]=useState(shippingAddress.fullName)
    const [address, setAddress]=useState(shippingAddress.address)
    const [city, setCity]=useState(shippingAddress.city)
    const [postalCode, setPostalCode]=useState(shippingAddress.postalCode)
    const [country, setCountry]=useState(shippingAddress.country)

    const formObj = [
        {
            id:'fullName',
            value: fullName,
            title:'Full Name',
            placeholder: 'Enter Full Name',
            change(e){
                setFullName(e.target.value)
            }
        },
        {
            id:'address',
            value: address,
            type:'text',
            title:'Address',
            placeholder: 'Enter Address',
            change(e){
                setAddress(e.target.value)
            }
        },
        {
            id:'city',
            value: city,
            type:'text',
            title:'City',
            placeholder: 'Enter City',
            change(e){
                setCity(e.target.value)
            }
        },
        {
            id:'postalCode',
            value: postalCode,
            type:'number',
            title:'Postal Code',
            placeholder: 'Enter Postal Code',
            change(e){
                setPostalCode(e.target.value)
            }
        },
        {
            id:'country',
            value: country,
            type:'text',
            title:'Country',
            placeholder: 'Enter Country',
            change(e){
                setCountry(e.target.value)
            }
        },

    ]

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName,address,city,postalCode,country}))
        props.history.push('payment')
    }



    return (
        <div>
            <CheckoutSteps  
                step1
                step2
            />
            <form action="" onSubmit={submitHandler} className="form">
                <div>
                    <h1>Shipping Address</h1>
                </div>
                {
                    formObj.map((item,i)=>(
                        <div key={i}>
                            <label htmlFor={item.id}>{item.title}</label>
                            <input 
                                type="text" 
                                id={item.id} 
                                placeholder={item.placeholder}
                                value={item.value}
                                onChange={e=> item.change(e)}
                                required
                            />
                        </div>
    
                    ))
                }
                <div>
                    <label htmlFor=""></label>
                    <button className="primary" type="submit">Continue</button>
                </div>



            </form>
        </div>
    )
}

export default ShippingAddressScreen
