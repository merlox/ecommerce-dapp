import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className="header">
            ECOMMERCE
            <Link to="/">Home</Link>
            <Link to="/sell">Sell</Link>
        </div>
    )
}

export default Header
