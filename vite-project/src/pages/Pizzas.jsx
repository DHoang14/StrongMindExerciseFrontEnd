import React, { useState} from 'react'
import { getAllPizzas, deletePizza } from '../api'
import { useLoaderData, Await, Link } from 'react-router'
import '../assets/topping.css'

export async function loader() {
    const pizzas = getAllPizzas()
    return { pizzas }
}

function Pizzas() {
    const { pizzas } = useLoaderData()
    const [deleted, setDeleted] = useState(false)

    async function remove(id){ 
        await deletePizza(id)
        setDeleted(true)
    }

    function renderPizzas(data) {
        const pizzaElements = data?
            data.map(pizza => {
                const toppingList = pizza.toppings.map(topping => topping.name)

                return <div className='card-container' key={pizza._id}>
                    <h3>{pizza.name}</h3>
                    <h2>Toppings: {toppingList.length > 0? toppingList.join(', ') : 'None'}</h2>
                    <div className='card-operations'>
                        <Link
                            to='/pizzas/edit'
                            state={{
                                id: pizza._id,
                                toppings: toppingList,
                            }}
                            className='topping-edit'> 
                            Edit
                        </Link>
                        <button onClick={async () => await remove(pizza._id)}>
                            Delete
                        </button>
                    </div>
                </div>})
            : null
        return (
            <div>
                <h2>Pizzas</h2>
                {deleted && <p>Refresh to see the new list!</p>}
                {pizzaElements}
                <div className='card-container'>
                    <Link 
                        className='topping-add' 
                        to="/pizzas/add"
                    >
                        Add a new pizza?
                    </Link>
                </div>
            </div>
            )
    }

    return (
        <div>
            <React.Suspense fallback={<h1>Loading pizzas...</h1>}>
                <Await resolve={pizzas}>
                    {renderPizzas}
                </Await>
            </React.Suspense>
        </div>
    )
}

export default Pizzas