import React from 'react'
import { Link } from 'react-router-dom';

// components
import Rating from './Rating';

const Product = ({product, i}) => {
    let {rating, numReviews} = product;
    return (
        <div className="card" key={product._id}>
            <Link to={`/product/${product._id}`}>
                <img className="medium" src={product.image} alt={product.name} />
            </Link>
            <div className="card-body">
                <Link to={`/product/${product._id}`}>
                    <h2>{product.name}</h2>
                </Link>
                <Rating 
                    rating = {rating}
                    numReviews = {numReviews}
                />
                <div className="price">
                    ${product.price}
                </div>
            </div>
        </div>         
    )
}

export default Product
