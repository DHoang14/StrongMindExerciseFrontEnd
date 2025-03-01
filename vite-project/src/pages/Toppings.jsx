import React, { useEffect, useState} from 'react'
import { getAllToppings, addTopping, deleteTopping } from '../api'
import { useLoaderData, Await, Link } from 'react-router'
import '../assets/topping.css'

export async function loader() {
    const toppings = getAllToppings()
    return { toppings }
}

function Toppings() {
    const { toppings } = useLoaderData()
    const [deleted, setDeleted] = useState(false)

    async function remove(id) {
        await deleteTopping(id)
        setDeleted(true)
    }

    function renderToppings(data) {
        const toppingElements = data?
            data.map(topping => 
                <div className='card-container' key={topping._id}>
                    <h3>{topping.name}</h3>
                    <div className='card-operations'>
                        <Link
                            to='/toppings/edit'
                            state={{
                                id: topping._id,
                            }}
                            className='topping-edit'> 
                            Edit
                        </Link>
                        <button onClick={async () => await remove(topping._id)}>
                            Delete
                        </button>
                    </div>
                </div>)
            : null
        return (
            <div>
                <h2>Toppings</h2>
                {deleted && <p>Refresh to see the new list!</p>}
                {toppingElements}
                <div className='card-container'>
                    <Link className='topping-add' to="/toppings/add">Add a new topping?</Link>
                </div>
            </div>
            )
    }


    return (
        <div>
            <React.Suspense fallback={<h1>Loading toppings...</h1>}>
                <Await resolve={toppings}>
                    {renderToppings}
                </Await>
            </React.Suspense>
        </div>
    )
}

export default Toppings