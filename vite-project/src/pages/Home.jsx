import React from "react"
import { Link } from "react-router-dom"
import '../assets/home.css'

function Home() {
    return (
       <div className="home-page">
            <h1>Pizza Recipes & Toppings</h1>
            <h2>All available at the tips of your fingers.</h2>
            <Link className="home-link" to="pizzas">View Pizza Recipes Here</Link>
            <Link className="home-link" to="toppings">View Common Toppings Here</Link>
       </div>
    )
}

export default Home