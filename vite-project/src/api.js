export async function getAllToppings() {
    //get
    const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "include"
    }
    let res
    try {
        res = await fetch(`https://strongmindexercisebackend.onrender.com/toppings`, requestOptions)
    } catch (err) {
        //typically if it failed to connect to the backend or its database
        throw {
            status: err.status
        }
    }

    if (res.status === 204) {
        return null
    }
    const data = await res.json()
    return data
}

export async function addTopping(name) {
    //post
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({name})
    }
    let res
    try {
        res = await fetch(`https://strongmindexercisebackend.onrender.com/toppings`, requestOptions)
    } catch (err) {
        //typically if it failed to connect to the backend or its database
        throw {
            status: err.status
        }
    }

    if (!res.ok) {
        throw {
            status: res.status
        }
    }
    const data = await res.json()
    return data
}

export async function deleteTopping(id) {
    //delete
    const requestOptions = {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({id})
    }
    let res
    try {
        res = await fetch(`https://strongmindexercisebackend.onrender.com/toppings`, requestOptions)
    } catch (err) {
        //typically if it failed to connect to the backend or its database
        throw {
            status: err.status
        }
    }

    if (!res.ok) {
        throw {
            status: res.status
        }
    }
    const data = await res.json()
    return data
}

export async function updateTopping(id, name) {
    //put
    const requestOptions = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({id, name})
    }
    let res
    try {
        res = await fetch(`https://strongmindexercisebackend.onrender.com/toppings`, requestOptions)
    } catch (err) {
        //typically if it failed to connect to the backend or its database
        throw {
            status: err.status
        }
    }

    if (!res.ok) {
        throw {
            status: res.status
        }
    }
    const data = await res.json()
    return data
}

export async function getAllPizzas() {
    //get
    const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "include"
    }
    let res
    try {
        res = await fetch(`https://strongmindexercisebackend.onrender.com/pizza`, requestOptions)
    } catch (err) {
        //typically if it failed to connect to the backend or its database
        throw {
            status: err.status
        }
    }

    if (res.status === 204) {
        return null
    }
    const data = await res.json()
    return data
}

export async function addPizza(name, toppings) {
    //post
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: toppings? JSON.stringify({name, toppings}) : JSON.stringify({name})
    }
    let res
    try {
        res = await fetch(`https://strongmindexercisebackend.onrender.com/pizza`, requestOptions)
    } catch (err) {
        //typically if it failed to connect to the backend or its database
        throw {
            status: err,
        }
    }

    if (!res.ok) {
        throw {
            status: res.status
        }
    }
    const data = await res.json()
    return data
}

export async function deletePizza(id) {
    //delete
    const requestOptions = {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({id})
    }
    let res
    try {
        res = await fetch(`https://strongmindexercisebackend.onrender.com/pizza`, requestOptions)
    } catch (err) {
        //typically if it failed to connect to the backend or its database
        throw {
            status: err.status
        }
    }

    if (!res.ok) {
        throw {
            status: res.status
        }
    }
    const data = await res.json()
    return data
}

export async function updatePizza(id, name, toppings) {
    //put
    let reqBody
    if (name && toppings) {
        reqBody = JSON.stringify({id, name, toppings})
    } else if (name) {
        reqBody = JSON.stringify({id, name})
    } else if (toppings) {
        reqBody = JSON.stringify({id, toppings})
    } else {
        reqBody = JSON.stringify({id})
    }

    const requestOptions = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: reqBody
    }
    let res
    try {
        res = await fetch(`https://strongmindexercisebackend.onrender.com/pizza`, requestOptions)
    } catch (err) {
        //typically if it failed to connect to the backend or its database
        throw {
            status: err.status
        }
    }

    if (!res.ok) {
        throw {
            status: res.status
        }
    }
    const data = await res.json()
    return data
}