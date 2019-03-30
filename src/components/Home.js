import React from 'react'
import MyWeb3 from 'web3'
import Header from './Header'

Array.prototype.asyncForEach = function (callback) {
    return new Promise(resolve => {
        for(let i = 0; i < this.length; i++) {
            callback(this[i], i, this)
        }
        resolve()
    })
}

class Home extends React.Component {
    constructor() { super() }
    render() {
        return (
            <div>
                <Header />
                <div className="products-container">{this.props.productsHtml}</div>
                <div className="spacer"></div>
            </div>
        )
    }
}

export default Home
