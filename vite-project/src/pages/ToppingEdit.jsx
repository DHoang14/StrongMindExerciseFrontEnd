import React, {useEffect} from 'react'
import {
    Form,
    useNavigation,
    useActionData,
    redirect,
    useLocation
} from 'react-router'
import { updateTopping } from '../api'

export async function action({request}) {
    const formData = await request.formData()
    const newName = formData.get('newName')
    const id = formData.get('id')
    try {
        const result = await updateTopping(id, newName)
        return redirect('/toppings')
    } catch (err) {
        return new Response(JSON.stringify({error: err.status}), {
            headers: { 'Content-Type': 'application/json'}
        })
    }
}

function ToppingEdit() {
    const actionData = useActionData()
    const navigation = useNavigation()
    const location = useLocation()

    let resultMsg
    if (actionData?.error) {
        if (actionData.error === 400) {
            resultMsg = 'Topping id and name are required.'
        } else if (actionData.error === 409) {
            resultMsg = 'Topping with that name already exists.'
        } else if (actionData.error === 500) {
            resultMsg = 'Cannot connect to server. Please try again in a few minutes.'
        }
    }

    return (
        <div className='form-container'>
            <h1>Change topping name</h1>
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
                    required
                />
                <button
                    disabled={navigation.state === 'submitting'}
                >
                    {navigation.state === 'submitting'? 'Updating...' : 'Update'}
                </button>

            </Form>

        </div>
    )
}

export default ToppingEdit