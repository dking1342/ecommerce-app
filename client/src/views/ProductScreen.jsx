import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// components
import Rating from '../components/Rating';
import Loading from './../components/Loading';
import MessageBox from './../components/MessageBox';

// redux
import { detailsProduct } from '../actions/productActions';



const ProductScreen = (props) => {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty,setQty]=useState(1);
    const productDetails = useSelector(state=> state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(()=>{
        dispatch(detailsProduct(productId))
    },[dispatch, productId])

    const addToCartHandler = () => {
        return props.history.push(`/cart/${productId}?qty=${qty}`)
    }

    if(!product){
        return <div>Product Not Found</div>
    }
    return (
        <div>
            {
                loading ? 
                    <Loading /> : 
                    error ? 
                    <MessageBox variant='danger'>{error}</MessageBox> : 
                    <>
                    <Link to="/">Back to results</Link>
                        <div className="row top">
                            <div className="col-2">
                                <img className="large" src={product.image} alt={product.name}/>
                            </div>
                            <div className="col-1">
                                <ul>
                                    <li>
                                        <h1>{product.name}</h1>
                                    </li>
                                    <li>
                                        <Rating 
                                            rating = {product.rating}
                                            numReviews = {product.numReviews}
                                        />
                                    </li>
                                    <li>Price: ${product.price}</li>
                                    <li>
                                        Description:
                                        <p>{product.description}</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-1">
                                <div className="card card-body">
                                    <ul>
                                        <li>
                                            <div className="row">
                                                <div>Price</div>
                                                <div className="price">${product.price}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Status</div>
                                                <div>
                                                    {
                                                        product.countInStock > 0 ? (
                                                            <span className="success">In stock</span>
                                                        ) : (
                                                            <span className="danger">Unavailable</span>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                        {
                                            product.countInStock > 0 && (
                                                <>
                                                    <li>
                                                        <div className="row">
                                                            <div>Qty</div>
                                                            <div>
                                                                <select value={qty} onChange={e=> setQty(e.target.value)}>
                                                                    {
                                                                        [...Array(product.countInStock).keys()].map(item=>(
                                                                            <option key={item + 1} value={Number(item) + 1}>{item + 1}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </li>
                                        
                                                    <li>
                                                        <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                                                    </li>
                                                </>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>    
                        </>

            }   
        </div>
    )
}

export default ProductScreen
