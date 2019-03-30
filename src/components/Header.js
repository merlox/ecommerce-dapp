import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className="header">
            ECOMMERCE
            <div>
                <Link to="/">Home</Link>
                <Link to="/sell">Sell</Link>
            </div>
        </div>
    )
}

export default Header
