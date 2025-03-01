import React from 'react'
import {
    Form,
    useNavigation,
    useActionData,
    redirect,
    useLocation
} from 'react-router'
import { updateTopping } from '../api'
import '../assets/form.css'

export async function action({request}) {
    const formData = await request.formData()
    const newName = formData.get('newName')
    const id = formData.get('id')
    try {
        const result = await updateTopping(id, newName)
        return redirect('/toppings')
    } catch (err) {
        return new Response(JSON.stringify({error: err.message}), {
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
        resultMsg = actionData.error
    }

    return (
        <div className='form-container'>
            <h1 className='form-title'>Change topping name</h1>
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