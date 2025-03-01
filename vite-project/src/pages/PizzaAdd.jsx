import React from 'react'
import {
    Form,
    useNavigation,
    useActionData,
    useLoaderData,
    Await
} from 'react-router'
import { addPizza } from '../api'
import '../assets/form.css'

export async function action({request}) {
    const formData = await request.formData()
    const name = formData.get('name')
    const toppings = Array.from(formData.keys()).slice(1) //first element is always name
    try {
        const result = await addPizza(name, toppings)
        return result
    } catch (err) {
        return new Response(JSON.stringify({error: err.message}), {
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
        resultMsg = actionData.error
    } else if (actionData) {
        resultMsg = 'Successfully added new pizza.'
    }


    function renderForm(toppings) {
        const toppingOptions = toppings.map(topping => {
            return (
                <label key={topping._id}>
                    <input
                        type="checkbox"
                        name={topping._id}
                    />
                {topping.name}</label>
            )
        })

        return (
            <div className='form-container'>
                <h1 className='form-title'>Add a new pizza</h1>
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
                    <div className='form-checkboxes'>
                        {toppingOptions}
                    </div>
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