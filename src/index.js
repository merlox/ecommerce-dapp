import React from 'react'
import ReactDOM from 'react-dom'
import MyWeb3 from 'web3'
import { BrowserRouter, Link, Route, withRouter } from 'react-router-dom'
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
    constructor(props) {
        super(props)

        this.state = {
            products: [{
                id: 1,
                title: 'Clasic trendy shoes',
                description: 'New unique shoes for sale',
                date: Date.now(),
                owner: '',
                price: 12,
                quantity: 10,
                image: 'https://cdn.shopify.com/s/files/1/2494/8702/products/Bjakin-2018-Socks-Running-Shoes-for-Men-Lightweight-Sports-Sneakers-Colors-Man-Sock-Walking-Shoes-Big_17fa0d5b-d9d9-46a0-bdea-ac2dc17474ce_400x.jpg?v=1537755930'
            }, {
                id: 2,
                title: 'Flat heel shoes',
                description: 'For women yellow spring shoes',
                date: Date.now(),
                owner: '',
                price: 62,
                quantity: 10,
                image: 'https://ae01.alicdn.com/kf/HTB10VmYPFXXXXckXFXXq6xXFXXXY/Spring-and-Autumn-Flats-Women-Flat-heel-Shoes-Fashion-Leopard-Flats-Women-Shoes-Casual-Soft-Comfortable.jpg_640x640.jpg'
            }, {
                id: 3,
                title: 'White shoes unisex',
                description: "100% Synthetic Imported \nRubber sole \nShaft measures approximately Low-Top from arch \nLace-up skate shoe with smooth abrasion-resistant upper featuring signature 3-Stripes logoing and wraparound midsole \nGrippy vulcanized rubber outsole sticks to board for control",
                date: Date.now(),
                owner: '',
                price: 28,
                quantity: 10,
                image: 'http://www.cottageartcreations.com/wp-content/uploads/2017/09/white-shoes-aliexpress-com-buy-new-men-flat-shoes-spring-autumn-black-white-man-srjqhnn-.jpg'
            }],
            productsHtml: [],
            productDetails: [],
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
        this.setState({products})
        this.displayProducts()
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
                        <div className="product-quantity">{product.quantity} units available</div>
                        <button onClick={() => {
                            this.setState({product})
                            this.redirectTo(this.props.history, '/product')
                        }} className="product-view" type="button">View</button>
                    </div>
                </div>
            ))
        })
        this.setState({productsHtml})
    }

    redirectTo(history, location) {
		history.push({
			pathname: location
		})
	}

    render() {
        return (
            <div>
                <Route path="/product" render={() => (
                    <Product product={this.state.product} />
                )}/>
                <Route path="/sell" render={() => (
                    <Sell />
                )}/>
                <Route path="/" exact render={context => (
                    <Home
                        productsHtml={this.state.productsHtml}
                    />
                )} />
            </div>
        )
    }
}

// To be able to access the history in order to redirect users programatically when openning a product
Main = withRouter(Main)

ReactDOM.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>,
document.querySelector('#root'))
