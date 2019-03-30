import React from 'react'
import MyWeb3 from 'web3'

Array.prototype.asyncForEach = function (callback) {
    return new Promise(resolve => {
        for(let i = 0; i < this.length; i++) {
            callback(this[i], i, this)
        }
        resolve()
    })
}

class Home extends React.Component {
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
                description: "100% Synthetic Imported \nRubber sole \nShaft measures approximately Low-Top from arch \nLace-up skate shoe with smooth abrasion-resistant upper featuring signature 3-Stripes logoing and wraparound midsole \nGrippy vulcanized rubber outsole sticks to board for control",
                date: Date.now(),
                owner: '',
                price: 28,
                quantity: 10,
                image: 'http://www.cottageartcreations.com/wp-content/uploads/2017/09/white-shoes-aliexpress-com-buy-new-men-flat-shoes-spring-autumn-black-white-man-srjqhnn-.jpg'
            }],
            productsHtml: [],
            productDetails: []
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
                        <div className="product-description">{product.description.substring(0, 50) + '...'}</div>
                        <div className="product-price">{product.price} ETH</div>
                        <div className="product-quantity">{product.quantity} units available</div>
                        <button onClick={() => {
                            this.productDetails(product)
                        }} className="product-view" type="button">View</button>
                    </div>
                </div>
            ))
        })
        this.setState({productsHtml})
    }

    async productDetails(product) {
        let productDetails = (
            <div>
                <div className="product-details">
                    <img className="product-image" src={product.image} />
                    <div className="product-data">
                        <h3 className="product-title">{product.title}</h3>
                        <ul className="product-description">
                            {product.description.split('\n').map((line, index) => (
                                <li key={index}>{line}</li>
                            ))}
                        </ul>
                        <div className="product-data-container">
                            <div className="product-price">{product.price} ETH</div>
                            <div className="product-quantity">{product.quantity} units available</div>
                        </div>
                        <button className="product-buy" type="button">Buy</button>
                    </div>
                </div>
                <hr/>
            </div>
        )
        this.setState({productDetails})
    }

    render() {
        return (
            <div>
                {this.state.productDetails}
                <div className="products-container">{this.state.productsHtml}</div>
                <div className="spacer"></div>
            </div>
        )
    }
}

export default Home
