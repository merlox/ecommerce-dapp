import React from 'react'
import Header from './Header'

class Sell extends React.Component {
    constructor() {
        super()
        this.state = {
            title: '',
            description: '',
            price: '',
            quantity: '',
            image: '',
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div className="sell-page">
                    <h3>Sell product</h3>
                    <input onChange={event => {
                        this.setState({title: event.target.value})
                    }} type="text" placeholder="Product title..." />
                    <textarea placeholder="Product description..." onChange={event => {
                        this.setState({description: event.target.value})
                    }}></textarea>
                    <input onChange={event => {
                        this.setState({price: event.target.value})
                    }} type="text" placeholder="Product price in ETH..." />
                    <input onChange={event => {
                        this.setState({quantity: event.target.value})
                    }} type="text" placeholder="Product quantity..." />
                    <input onChange={event => {
                        this.setState({image: event.target.value})
                    }} type="text" placeholder="Product image URL..." />
                    <p>Note that shipping costs are considered free so add the shipping price to the cost of the product itself</p>
                    <button onClick={() => {
                        this.props.publishProduct(this.state)
                    }} type="button">Publish product</button>
                </div>
            </div>
        )
    }
}

export default Sell
