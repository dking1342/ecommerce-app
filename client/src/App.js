import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

// components
import HomeScreen from './views/HomeScreen';
import ProductScreen from './views/ProductScreen';
import CartScreen from './views/CartScreen';

function App() {
  return (
      <BrowserRouter>
        <div className="grid-container">
            <header className="row">
                <div>
                    <a className="brand" href="/">Amazona</a>
                </div>
                <div>
                  <a href="cart.html">Cart</a>
                  <a href="signin.html">Sign in</a>
                </div>
            </header>
            <main>
              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/product/:id" component ={ProductScreen}/>
              <Route path="/" exact component={HomeScreen} />
            </main>
            <footer className="row center">Rights Reserved</footer>
        </div>
      </BrowserRouter>
  );
}

export default App;
