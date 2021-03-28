import React, { useState, useEffect } from 'react'

// dataset


// components
import Product from './../components/Product';
import Loading from './../components/Loading';
import MessageBox from './../components/MessageBox';


const HomeScreen = () => {
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);

    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                setLoading(false);
                setProducts(data)                    
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
        fetchData()
    },[])


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
