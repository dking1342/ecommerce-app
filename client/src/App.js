import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';

// components
import HomeScreen from './views/HomeScreen';
import ProductScreen from './views/ProductScreen';
import CartScreen from './views/CartScreen';
import RegisterScreen from './views/RegisterScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './views/SigninScreen';
import { signout } from './actions/userActions';
import ShippingAddressScreen from './views/ShippingAddressScreen';
import PaymentMethodScreen from './views/PaymentMethodScreen';
import PlaceOrderScreen from './views/PlaceOrderScreen';
import OrderScreen from './views/OrderScreen';
import OrderHistoryScreen from './views/OrderHistoryScreen';
import ProfileScreen from './views/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const cart = useSelector(state=> state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector(state=> state.userSignin);
  const {userInfo} = userSignin;
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout())
  }

  return (
      <BrowserRouter>
        <div className="grid-container">
            <header className="row">
                <div>
                    <Link className="brand" to="/">Amazona</Link>
                </div>
                <div>
                  <Link to="/cart">Cart 
                    {cartItems.length > 0 && (
                      <span className="badge">{cartItems.length}</span>
                    )} 
                  </Link>
                  {
                    userInfo 
                      ? (
                        <div className="dropdown">
                          <Link to="#">{userInfo.name} <i className="fa fa-caret-down" ></i>  </Link>
                          <ul className="dropdown-content">
                            <li>
                              <Link to="profile">User Profile</Link>
                            </li>
                            <li>
                              <Link to="/orderhistory">Order History</Link>
                            </li>
                            <li>
                              <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                            </li>
                          </ul>
                        </div>
                      )
                      : (
                        <Link to="/signin">Sign In</Link>
                      )
                  }
                </div>
            </header>
            <main>
              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/product/:id" component ={ProductScreen}/>
              <Route path="/signin" component={SigninScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/shipping" component={ShippingAddressScreen} />
              <Route path="/payment" component={PaymentMethodScreen} />
              <Route path="/placeorder" component={PlaceOrderScreen} />
              <Route path="/order/:id" component={OrderScreen}/>
              <Route path="/orderhistory" component={OrderHistoryScreen} />
              <PrivateRoute path="/profile" component={ProfileScreen} />
              <Route path="/" exact component={HomeScreen} />
            </main>
            <footer className="row center">Rights Reserved</footer>
        </div>
      </BrowserRouter>
  );
}

export default App;
