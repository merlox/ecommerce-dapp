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
                description: 'General white shoes for common use',
                date: Date.now(),
                owner: '',
                price: 28,
                quantity: 10,
                image: 'http://www.cottageartcreations.com/wp-content/uploads/2017/09/white-shoes-aliexpress-com-buy-new-men-flat-shoes-spring-autumn-black-white-man-srjqhnn-.jpg'
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
                <div key={product.id} className="product">
                    <img className="product-image" src={product.image} />
                    <div className="product-data">
                        <h3 className="product-title">{product.title}</h3>
                        <div className="product-description">{product.description}</div>
                        <div className="product-price">{product.price} ETH</div>
                        <div className="product-quantity">{product.quantity} units</div>
                    </div>
                </div>
            ))
        })
        this.setState({productsHtml})
    }

    render() {
        return (
            <div>
                <div className="products-container">{this.state.productsHtml}</div>
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.querySelector('#root'))
