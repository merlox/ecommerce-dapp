import React from 'react'
import ReactDOM from 'react-dom'
import MyWeb3 from 'web3'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Home from './components/Home'
import Product from './components/Product'
import Sell from './components/Sell'
import Header from './components/Header'

import './index.styl'

// A marketplace to sell all kinds of products with ERC 721 tokens.
// - A main page to see the most recent products
// - A product page to see details for that product
// - A sell page to publish new products
// - A buy page to indicate where it will be sent

// Each product will have the following properties
// - Id
// - Title
// - Description
// - Published date
// - Owner
// - Price in ETH
// - Quantity
// - Image URL

class Main extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <Route path="/product" render={() => (
                    <Product />
                )}/>
                <Route path="/sell" render={() => (
                    <Sell />
                )}/>
                <Route path="/" render={() => (
                    <Header />
                )} />
                <Route path="/" exact render={() => (
                    <Home />
                )} />
            </div>
        )
    }
}

ReactDOM.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>,
document.querySelector('#root'))
