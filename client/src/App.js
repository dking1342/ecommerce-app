import React from 'react'

// dataset
import { data } from './../src/data'

// components
import Product from './components/Product';

function App() {
  return (
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
              <div className="row center">
                {
                  data.products.map((product,i)=>(
                    <Product 
                      product = {product}
                      i = {i}
                    />
                  ))
                }
              </div>
            </main>
            <footer className="row center">Rights Reserved</footer>
        </div>
  );
}

export default App;
