import React from 'react'

class Product extends React.Component {
    constructor() { super() }
    render() {
        return (
            <div>
                <div className="product-details">
                    <img className="product-image" src={this.props.product.image} />
                    <div className="product-data">
                        <h3 className="product-title">{this.props.product.title}</h3>
                        <ul className="product-description">
                            {this.props.product.description.split('\n').map((line, index) => (
                                <li key={index}>{line}</li>
                            ))}
                        </ul>
                        <div className="product-data-container">
                            <div className="product-price">{this.props.product.price} ETH</div>
                            <div className="product-quantity">{this.props.product.quantity} units available</div>
                        </div>
                        <button className="product-buy" type="button">Buy</button>
                    </div>
                </div>
                <hr/>
            </div>
        )
    }
}

export default Product
