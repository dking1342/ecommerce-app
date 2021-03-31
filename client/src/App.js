import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom';

// components
import HomeScreen from './views/HomeScreen';
import ProductScreen from './views/ProductScreen';
import CartScreen from './views/CartScreen';
import { useSelector } from 'react-redux';
import SigninScreen from './views/SigninScreen';

function App() {
  const cart = useSelector(state=> state.cart);
  const {cartItems} = cart;
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
                  <Link to="/signin">Sign in</Link>
                </div>
            </header>
            <main>
              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/product/:id" component ={ProductScreen}/>
              <Route path="/signin" component={SigninScreen} />
              <Route path="/" exact component={HomeScreen} />
            </main>
            <footer className="row center">Rights Reserved</footer>
        </div>
      </BrowserRouter>
  );
}

export default App;
