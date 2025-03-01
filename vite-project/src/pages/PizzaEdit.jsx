import React from 'react'
import {
    Form,
    useNavigation,
    useActionData,
    redirect,
    useLocation,
    useLoaderData,
    Await
} from 'react-router'
import { updatePizza } from '../api'
import '../assets/form.css'

export async function action({request}) {
    const formData = await request.formData()
    const newName = formData.get('newName')
    const id = formData.get('id')
    const toppings = Array.from(formData.keys()).slice(2) //first element is always name

    try {
        const result = await updatePizza(id, newName, toppings)
        return redirect('/pizzas')
    } catch (err) {
        return new Response(JSON.stringify({error: err.status}), {
            headers: { 'Content-Type': 'application/json'}
        })
    }
}

function PizzaEdit() {
    const actionData = useActionData()
    const navigation = useNavigation()
    const location = useLocation()
    const { toppings } = useLoaderData()

    let resultMsg
    if (actionData?.error) {
        if (actionData.error === 400) {
            resultMsg = 'Pizza id and name are required.'
        } else if (actionData.error === 409) {
            resultMsg = 'Pizza with that name already exists.'
        } else if (actionData.error === 500) {
            resultMsg = 'Cannot connect to server. Please try again in a few minutes.'
        }
    }

    function renderForm(toppings) {
        const toppingOptions = toppings.map(topping => {
            return (
                <label key={topping._id}>
                    <input
                        type="checkbox"
                        name={topping._id}
                        defaultChecked={location.state?.toppings? location.state.toppings.includes(topping.name) : false}
                    />
                {topping.name}</label>
            )
        })

        return (
            <div className='form-container'>
                <h1 className='form-title'>Change pizza name</h1>
                {actionData && resultMsg}
                <Form
                    method='post'
                    className='form'
                    replace
                >
                    <input 
                        type='hidden'
                        name='id'
                        value={location.state?.id}
                    />
                    <input
                        name='newName'
                        type='text'
                        placeholder='Name'
                    />
                    <div className='form-checkboxes'>
                        {toppingOptions}
                    </div>
                    <button
                        disabled={navigation.state === 'submitting'}
                    >
                        {navigation.state === 'submitting'? 'Updating...' : 'Update'}
                    </button>
                </Form>
            </div>
        )
    }
    
    return (
        <div>
            <React.Suspense fallback={<h1>Gathering topping options...</h1>}>
                <Await resolve={toppings}>
                    {renderForm}
                </Await>
            </React.Suspense>
        </div>
    )
}

export default PizzaEdit