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
                quantity: 10,
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
                quantity: 10,
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
                quantity: 10,
                image: 'https://ae01.alicdn.com/kf/HTB10VmYPFXXXXckXFXXq6xXFXXXY/Spring-and-Autumn-Flats-Women-Flat-heel-Shoes-Fashion-Leopard-Flats-Women-Shoes-Casual-Soft-Comfortable.jpg_640x640.jpg',
                state: 'pending',
            }, {
                id: 3,
                title: 'White shoes unisex',
                description: "100% Synthetic Imported \nRubber sole \nShaft measures approximately Low-Top from arch \nLace-up skate shoe with smooth abrasion-resistant upper featuring signature 3-Stripes logoing and wraparound midsole \nGrippy vulcanized rubber outsole sticks to board for control",
                date: Date.now(),
                owner: '',
                price: 28,
                quantity: 10,
                image: 'http://www.cottageartcreations.com/wp-content/uploads/2017/09/white-shoes-aliexpress-com-buy-new-men-flat-shoes-spring-autumn-black-white-man-srjqhnn-.jpg',
                state: 'completed',
            }],
            pendingSellOrdersHtml: [],
            pendingBuyOrdersHtml: [],
            completedSellOrdersHtml: [],
            completedBuyOrdersHtml: [],
        }

        this.displayOrders()
    }

    async getUserOrders() {}

    async displayOrders() {
        let pendingSellOrdersHtml = []
        let pendingBuyOrdersHtml = []
        let completedSellOrdersHtml = []
        let completedBuyOrdersHtml = []
        await this.state.sellOrders.asyncForEach(product => {
            let html = (
                <div key={product.id} className="product">
                    <img className="product-image" src={product.image} />
                    <div className="product-data">
                        <h3 className="product-title">{product.title}</h3>
                        <div className="product-description">{product.description.substring(0, 50) + '...'}</div>
                        <div className="product-price">{product.price} ETH</div>
                        <div className="product-quantity">{product.quantity} units available</div>
                        <button onClick={() => {
                            this.props.setState({product})
                            this.props.redirectTo('/product')
                        }} className="product-view" type="button">View</button>
                    </div>
                </div>
            )
            if(product.state = 'pending') pendingSellOrdersHtml.push(html)
            if(product.state = 'completed') completedSellOrdersHtml.push(html)
        })
        await this.state.buyOrders.asyncForEach(product => {
            let html = (
                <div key={product.id} className="product">
                    <img className="product-image" src={product.image} />
                    <div className="product-data">
                        <h3 className="product-title">{product.title}</h3>
                        <div className="product-description">{product.description.substring(0, 50) + '...'}</div>
                        <div className="product-price">{product.price} ETH</div>
                        <div className="product-quantity">{product.quantity} units available</div>
                        <button onClick={() => {
                            this.props.setState({product})
                            this.props.redirectTo('/product')
                        }} className="product-view" type="button">View</button>
                    </div>
                </div>
            )
            if(product.state = 'pending') pendingBuyOrdersHtml.push(html)
            if(product.state = 'completed') completedBuyOrdersHtml.push(html)
        })
        this.setState({pendingSellOrdersHtml, pendingBuyOrdersHtml, completedSellOrdersHtml, completedBuyOrdersHtml})
    }

    render() {
        return (
            <div>
                <Header />
                <div className="orders-page">
                    <div>
                        <h3>Pending orders as a seller</h3>
                        {this.state.pendingSellOrdersHtml}
                    </div>

                    <div>
                        <h3>Pending orders as a buyer</h3>
                        {this.state.pendingBuyOrdersHtml}
                    </div>

                    <div>
                        <h3>Completed sell orders</h3>
                        {this.state.completedSellOrdersHtml}
                    </div>

                    <div>
                        <h3>Completed buy orders</h3>
                        {this.state.completedBuyOrdersHtml}
                    </div>
                </div>
            </div>
        )
    }
}


export default Orders
