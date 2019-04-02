import React, { Component } from 'react'
import Header from './Header'

class Orders extends Component {
    constructor() {
        super()

        // We'll separate the completed vs the pending based on the order state
        this.state = {
            sellOrders: [{
                id: 1,
                title: 'Clasic trendy shoes',
                description: 'New unique shoes for sale',
                date: Date.now(),
                owner: '',
                price: 12,
                image: 'https://cdn.shopify.com/s/files/1/2494/8702/products/Bjakin-2018-Socks-Running-Shoes-for-Men-Lightweight-Sports-Sneakers-Colors-Man-Sock-Walking-Shoes-Big_17fa0d5b-d9d9-46a0-bdea-ac2dc17474ce_400x.jpg?v=1537755930',
                purchasedAt: Date.now(),
                state: 'completed',
            }, {
                id: 3,
                title: 'White shoes unisex',
                description: "100% Synthetic Imported \nRubber sole \nShaft measures approximately Low-Top from arch \nLace-up skate shoe with smooth abrasion-resistant upper featuring signature 3-Stripes logoing and wraparound midsole \nGrippy vulcanized rubber outsole sticks to board for control",
                date: Date.now(),
                owner: '',
                price: 28,
                image: 'http://www.cottageartcreations.com/wp-content/uploads/2017/09/white-shoes-aliexpress-com-buy-new-men-flat-shoes-spring-autumn-black-white-man-srjqhnn-.jpg',
                state: 'pending',
            }],
            buyOrders: [{
                id: 2,
                title: 'Flat heel shoes',
                description: 'For women yellow spring shoes',
                date: Date.now(),
                owner: '',
                price: 62,
                image: 'https://ae01.alicdn.com/kf/HTB10VmYPFXXXXckXFXXq6xXFXXXY/Spring-and-Autumn-Flats-Women-Flat-heel-Shoes-Fashion-Leopard-Flats-Women-Shoes-Casual-Soft-Comfortable.jpg_640x640.jpg',
                state: 'pending',
            }, {
                id: 3,
                title: 'White shoes unisex',
                description: "100% Synthetic Imported \nRubber sole \nShaft measures approximately Low-Top from arch \nLace-up skate shoe with smooth abrasion-resistant upper featuring signature 3-Stripes logoing and wraparound midsole \nGrippy vulcanized rubber outsole sticks to board for control",
                date: Date.now(),
                owner: '',
                price: 28,
                image: 'http://www.cottageartcreations.com/wp-content/uploads/2017/09/white-shoes-aliexpress-com-buy-new-men-flat-shoes-spring-autumn-black-white-man-srjqhnn-.jpg',
                state: 'completed',
            }],
            pendingSellOrdersHtml: [],
            pendingBuyOrdersHtml: [],
            completedSellOrdersHtml: [],
            completedBuyOrdersHtml: [],
        }
        this.setup()
    }

    async setup() {
        await this.getOrders(5)
        await this.displayOrders()
    }

    async getOrders(amount) {
        console.log('Called')
        const pendingSellerOrdersLength = parseInt(await contract.methods.lastPendingSellerOrder().call())
        const pendingBuyerOrdersLength = parseInt(await contract.methods.lastPendingSellerOrder().call())
        const conditionSeller = (amount > pendingSellerOrdersLength) ? 0 : pendingSellerOrdersLength - amount
        const conditionBuyer = (amount > pendingBuyerOrdersLength) ? 0 : pendingBuyerOrdersLength - amount
        let pendingSellerOrders = []
        let pendingBuyerOrders = []

        console.log(pendingSellerOrdersLength, pendingBuyerOrdersLength, conditionSeller, pendingBuyerOrders)

        // In reverse to get the most recent orders first
        for(let i = pendingSellerOrdersLength; i > conditionSeller; i--) {
            const order = await contract.methods.pendingSellerOrders(user, i - 1).call()
            console.log('order', order)
        }
        // Get the orders and display the shipping address in a box
    }

    async markAsCompleted(product) {}

    async displayOrders() {
        let pendingSellOrdersHtml = []
        let pendingBuyOrdersHtml = []
        let completedSellOrdersHtml = []
        let completedBuyOrdersHtml = []
        await this.state.sellOrders.asyncForEach(product => {
            if(product.state == 'pending') {
                pendingSellOrdersHtml.push(
                    <div key={product.id} className="product">
                        <img className="product-image" src={product.image} />
                        <div className="product-data">
                            <h3 className="small-product-title">{product.title}</h3>
                            <div className="product-state">State: {product.state}</div>
                            <div className="product-description">{product.description.substring(0, 15) + '...'}</div>
                            <div className="product-price">{product.price} ETH</div>
                            <button className="small-view-button" onClick={() => {
                                this.props.setState({product})
                                this.props.redirectTo('/product')
                            }} type="button">View</button>
                            <button className="small-completed-button" onClick={() => {
                                this.markAsCompleted(product)
                            }} type="button">Mark as completed</button>
                        </div>
                    </div>
                )
            } else {
                completedSellOrdersHtml.push(
                    <div key={product.id} className="product">
                        <img className="product-image" src={product.image} />
                        <div className="product-data">
                            <h3 className="product-title">{product.title}</h3>
                            <div className="product-state">State: {product.state}</div>
                            <div className="product-description">{product.description.substring(0, 15) + '...'}</div>
                            <div className="product-price">{product.price} ETH</div>
                            <button onClick={() => {
                                this.props.setState({product})
                                this.props.redirectTo('/product')
                            }} className="product-view" type="button">View</button>
                        </div>
                    </div>
                )
            }
        })
        await this.state.buyOrders.asyncForEach(product => {
            let html = (
                <div key={product.id} className="product">
                    <img className="product-image" src={product.image} />
                    <div className="product-data">
                        <h3 className="product-title">{product.title}</h3>
                        <div className="product-state">State: {product.state}</div>
                        <div className="product-description">{product.description.substring(0, 15) + '...'}</div>
                        <div className="product-price">{product.price} ETH</div>
                        <button onClick={() => {
                            this.props.setState({product})
                            this.props.redirectTo('/product')
                        }} className="product-view" type="button">View</button>
                    </div>
                </div>
            )

            if(product.state == 'pending') pendingBuyOrdersHtml.push(html)
            else completedBuyOrdersHtml.push(html)
        })
        this.setState({pendingSellOrdersHtml, pendingBuyOrdersHtml, completedSellOrdersHtml, completedBuyOrdersHtml})
    }

    render() {
        return (
            <div>
                <Header />
                <div className="orders-page">
                    <div>
                        <h3 className="order-title">PENDING ORDERS AS A SELLER</h3>
                        {this.state.pendingSellOrdersHtml}
                    </div>

                    <div>
                        <h3 className="order-title">PENDING ORDERS AS A BUYER</h3>
                        {this.state.pendingBuyOrdersHtml}
                    </div>

                    <div>
                        <h3 className="order-title">COMPLETED SELL ORDERS</h3>
                        {this.state.completedSellOrdersHtml}
                    </div>

                    <div>
                        <h3 className="order-title">COMPLETED BUY ORDERS</h3>
                        {this.state.completedBuyOrdersHtml}
                    </div>
                </div>
            </div>
        )
    }
}

export default Orders
