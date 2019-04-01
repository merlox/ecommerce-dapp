import React from 'react'
import ReactDOM from 'react-dom'
import MyWeb3 from 'web3'
import { BrowserRouter, Route, withRouter } from 'react-router-dom'
import Home from './components/Home'
import Product from './components/Product'
import Sell from './components/Sell'
import Header from './components/Header'
import Buy from './components/Buy'
import Orders from './components/Orders'

import './index.styl'
import ABI from '../build/contracts/Ecommerce.json'

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

Array.prototype.asyncForEach = function (callback) {
    return new Promise(resolve => {
        for(let i = 0; i < this.length; i++) {
            callback(this[i], i, this)
        }
        resolve()
    })
}

class Main extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [],
            productsHtml: [],
            product: {},
        }

        this.setup()
    }

    bytes32(name) {
        return myWeb3.utils.fromAscii(name)
    }

    async setup() {
        // Create the contract instance
        window.myWeb3 = new MyWeb3(ethereum)
        try {
            await ethereum.enable();
        } catch (error) {
            console.error('You must approve this dApp to interact with it')
        }
        const user = (await myWeb3.eth.getAccounts())[0]
        let products = []
        for(let i = 0; i < this.state.products.length; i++) {
            products[i] = this.state.products[i]
            products[i].owner = user
        }
        window.contract = new myWeb3.eth.Contract(ABI.abi, ABI.networks['3'].address, {
            from: user
        })
        this.setState({products})
        await this.getLatestProducts(9)
        await this.displayProducts()
    }

    async displayProducts() {
        let productsHtml = []
        await this.state.products.asyncForEach(product => {
            productsHtml.push((
                <div key={product.id} className="product">
                    <img className="product-image" src={product.image} />
                    <div className="product-data">
                        <h3 className="product-title">{product.title}</h3>
                        <div className="product-description">{product.description.substring(0, 50) + '...'}</div>
                        <div className="product-price">{product.price} ETH</div>
                        <button onClick={() => {
                            this.setState({product})
                            this.redirectTo('/product')
                        }} className="product-view" type="button">View</button>
                    </div>
                </div>
            ))
        })
        this.setState({productsHtml})
    }

    redirectTo(location) {
		this.props.history.push({
			pathname: location
		})
	}

    async getLatestProducts(amount) {
        // Get the product ids
        const productsLength = parseInt(await contract.methods.productsLength().call())
        let products = []
        let condition = (amount > productsLength) ? 0 : productsLength - amount

        // Loop through all of them one by one
        for(let i = productsLength; i > condition; i--) {
            let product = await contract.methods.products(i - 1).call()
            product = {
                id: parseInt(product.id),
                title: product.title,
                date: parseInt(product.date),
                description: product.description,
                image: product.image,
                owner: product.owner,
                price: parseInt(product.price),
            }
            products.push(product)
        }
        this.setState({products})
    }

    render() {
        return (
            <div>
                <Route path="/product" render={() => (
                    <Product
                        product={this.state.product}
                        redirectTo={location => this.redirectTo(location)}
                    />
                )}/>
                <Route path="/sell" render={() => (
                    <Sell
                        publishProduct={data => this.publishProduct(data)}
                    />
                )}/>
                <Route path="/buy" render={() => (
                    <Buy
                        product={this.state.product}
                    />
                )} />
                <Route path="/orders" render={() => (
                    <Orders
                        setState={state => this.setState(state)}
                        redirectTo={location => this.redirectTo(location)}
                    />
                )} />
                <Route path="/" exact render={() => (
                    <Home
                        productsHtml={this.state.productsHtml}
                    />
                )} />
            </div>
        )
    }
}

// To be able to access the history in order to redirect users programatically when opening a product
Main = withRouter(Main)

ReactDOM.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>,
document.querySelector('#root'))
