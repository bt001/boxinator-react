import { createHeaders } from "./index"

const apiUrl = process.env.REACT_APP_API_URL

const checkForUser = async (email) => {
    try {
        let fetchString = `${apiUrl}users/login/${email}`
        alert(fetchString)
        const response = await fetch(fetchString)        
        if (!response.ok) {
            alert("resp not ok")
            throw new Error("Could not complete request.")
        }
        alert("received some kind of data")
        const data = await response.json()
        return [null, data]
    }
    catch (error) {
        return [error.message, []]
    }
}

const createUser = async (email) => {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: createHeaders(),
            body: JSON.stringify({
                email,
                translations: []
            })
        })
        if (!response.ok) {
            throw new Error("Could not create user with email " + email)
        }
        const data = await response.json()
        return [null, data]
    }
    catch (error) {
        return [error.message, []]
    }
}

export const loginUser = async (email,pw) => {
    alert(
        "pw =" + pw
    )
    const [checkError, user] = await checkForUser(email)

    if (checkError !== null) {
        alert("Error!")
        return [checkError, null]
    }

    if (user !== null) {
        alert("lol")
        alert(user.password)
        if (pw === user.password)
            {
                return [null, user]
            }           
    }                
    
}

export const userById = async (userId) => {
    try {
        const response = await fetch(`${apiUrl}/${userId}`)
        if (!response.ok) {
            throw new Error("Could not fetch user")
        }

        const user = await response.json()
        return [null, user]
    } catch (error) {
        return [error.message, null]
    }
}