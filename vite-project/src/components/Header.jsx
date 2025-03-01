import React from 'react'
import { Link, NavLink } from "react-router-dom"

function Header() {
    const activeStyles = {
        fontWeight: "bold",
        color: "yellowgreen"
    }

    return (
        <header>
            <Link className="site-home" to="/">Pizza Recipes</Link>
            <nav className="nav-options">
                <NavLink
                    to="toppings"
                    style={({isActive}) => isActive? activeStyles : null}
                >
                    Toppings    
                </NavLink>
                <NavLink
                    to="pizzas"
                    style={({isActive}) => isActive? activeStyles : null}
                >
                    Pizzas    
                </NavLink>
            </nav>
        </header>
    )
}

export default Header