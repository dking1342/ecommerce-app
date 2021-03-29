import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// components
import Product from './../components/Product';
import Loading from './../components/Loading';
import MessageBox from './../components/MessageBox';
import { listProducts } from './../actions/productActions';


const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    useEffect(()=>{
        dispatch(listProducts())
    },[dispatch])


    return (
        <div>
            {
                loading ? 
                    <Loading /> : 
                    error ? 
                    <MessageBox variant='danger'>{error}</MessageBox> : 
                    <div className="row center">
                    {
                        products.map((product,i)=>(
                        <Product 
                            product = {product}
                            i = {i}
                            key={product._id}
                        />
                        ))
                    }
                    </div>
            }
        </div>

    )
}

export default HomeScreen
