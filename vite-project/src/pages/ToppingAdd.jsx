import React from 'react'
import {
    Form,
    useNavigation,
    useActionData,
} from 'react-router'
import { addTopping } from '../api'
import '../assets/form.css'

export async function action({request}) {
    const formData = await request.formData()
    const name = formData.get('name')
    
    try {
        const result = await addTopping(name)
        return result
    } catch (err) {
        return new Response(JSON.stringify({error: err.status}), {
            headers: { 'Content-Type': 'application/json'}
        })
    }
}

function ToppingAdd() {
    const actionData = useActionData()
    const navigation = useNavigation()

    let resultMsg
    if (actionData?.error) {
        if (actionData.error === 400) {
            resultMsg = 'Topping name is required.'
        } else if (actionData.error === 409) {
            resultMsg = 'Topping with that name already exists.'
        } else if (actionData.error === 500) {
            resultMsg = 'Cannot connect to server. Please try again in a few minutes.'
        }
    } else if (actionData) {
        resultMsg = 'Successfully added new topping.'
    }

    return (
        <div className='form-container'>
            <h1 className='form-title'>Add a new topping</h1>
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
                <button
                    disabled={navigation.state === 'submitting'}
                >
                    {navigation.state === 'submitting'? 'Adding...' : 'Add'}
                </button>
            </Form>
        </div>
    )
}

export default ToppingAdd