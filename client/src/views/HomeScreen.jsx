import React, {  useEffect } from 'react';
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
                        <>
                            {/* {products.length === 0 && <MessageBox>No Product Found</MessageBox>} */}
                            <div className="row center">
                            {products.map((product) => (
                                <Product key={product._id} product={product}></Product>
                            ))}
                            </div>
                        </>
            }
        </div>

    )
}

export default HomeScreen
