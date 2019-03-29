import React from 'react'
import ReactDOM from 'react-dom'
import MyWeb3 from 'web3'
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

Array.prototype.asyncForEach = function (callback) {
    return new Promise(resolve => {
        for(let i = 0; i < this.length; i++) {
            callback(this[i], i, this)
        }
        resolve()
    })
}

class Main extends React.Component {
    constructor() {
        super()

        this.state = {
            products: [{
                id: 1,
                title: 'This is a cool cat',
                description: 'Turkish Van cat for sale',
                published: Date.now(),
                owner: '',
                price: 100,
                quantity: 10,
                image: 'https://en.wikipedia.org/wiki/Turkish_Van#/media/File:Push_van_cat.jpg'
            }, {
                id: 2,
                title: 'Papillon Book',
                description: 'The famous autobiography by Henri',
                published: Date.now(),
                owner: '',
                price: 100,
                quantity: 10,
                image: 'https://en.wikipedia.org/wiki/Papillon_(book)#/media/File:PapillonBook.jpg'
            }, {
                id: 3,
                title: 'Smart Ebike',
                description: 'A powerful ebike with smart utilities for better performance',
                published: Date.now(),
                owner: '',
                price: 100,
                quantity: 10,
                image: 'https://commons.wikimedia.org/wiki/Category:Smart_ebike#/media/File:Geneva_MotorShow_2013_-_Smart_electric_bike_left_view.jpg'
            }],
            productsHtml: []
        }

        this.setup()
    }

    // To use bytes32 functions
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
                <div key={product.id}>
                    {product.title}
                    {product.description}
                </div>
            ))
        })
        this.setState({productsHtml})
    }

    render() {
        return (
            <div>{this.state.productsHtml}</div>
        )
    }
}

ReactDOM.render(<Main />, document.querySelector('#root'))
