import React, {useEffect} from 'react'
import {
    Form,
    useNavigation,
    useActionData,
    useLoaderData,
    Await
} from 'react-router'
import { addPizza } from '../api'

export async function action({request}) {
    const formData = await request.formData()
    const name = formData.get('name')
    const toppings = Array.from(formData.keys()).slice(1) //first element is always name
    try {
        const result = await addPizza(name, toppings)
        return result
    } catch (err) {
        return new Response(JSON.stringify({error: err.status}), {
            headers: { 'Content-Type': 'application/json'}
        })
    }
}

function PizzaAdd() {
    const actionData = useActionData()
    const navigation = useNavigation()
    const { toppings } = useLoaderData()

    let resultMsg
    if (actionData?.error) {
        if (actionData.error === 400) {
            resultMsg = 'Pizza name is required.'
        } else if (actionData.error === 409) {
            resultMsg = 'Pizza with that name already exists.'
        } else if (actionData.error === 500) {
            resultMsg = 'Cannot connect to server. Please try again in a few minutes.'
        }
    } else if (actionData) {
        resultMsg = 'Successfully added new pizza.'
    }


    function renderForm(toppings) {
        const toppingOptions = toppings.map(topping => {
            return (
                <label className="checkbox" key={topping._id}>
                    <input
                        type="checkbox"
                        name={topping._id}
                    />
                {topping.name}</label>
            )
        })

        return (
            <div className='form-container'>
                <h1>Add a new pizza</h1>
                {actionData && resultMsg}
                <Form
                    method='post'
                    className='form'
                    replace
                >
                    <input
                        name='name'
                        type='text'
                        placeholder='Name'
                        required
                    />
                    {toppingOptions}
                    <button
                        disabled={navigation.state === 'submitting'}
                    >
                        {navigation.state === 'submitting'? 'Adding...' : 'Add'}
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

export default PizzaAdd