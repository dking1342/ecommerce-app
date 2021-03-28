import React from 'react'

// dataset
import { data } from './../data'

// components
import Product from './../components/Product';


const HomeScreen = () => {
    return (
        <div className="row center">
        {
            data.products.map((product,i)=>(
            <Product 
                product = {product}
                i = {i}
                key={product._id}
            />
            ))
        }
        </div>

    )
}

export default HomeScreen
