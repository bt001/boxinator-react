import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { loginUser } from "../../api/user"
import { storageSave } from "../../utils/storage";
import { useNavigate } from "react-router-dom"
import { useUser } from "../../context/UserContext";
import { STORAGE_KEY_USER } from "../../const/storageKeys";


const emailConfig = {
    required: true,
    minLength: 3
}

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { user, setUser } = useUser()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState(null)

    useEffect(() => {
        if (user !== null) {
            navigate("profile")
        }
    }, [user, navigate])

    const onSubmit = async ({ email , password }) => {
        setLoading(true)
        alert("password is " + password)
        const [error, userResponse] = await loginUser(email,password)
        if (error !== null) {
            setApiError(error)
        }
        if (userResponse !== null) {
            storageSave(STORAGE_KEY_USER, userResponse)
            setUser(userResponse)
        }
        setLoading(false)
    }

    const errorMessage = (() => {
        if (!errors.email) {
            return null
        }

        if (errors.email.type === "required") {
            return <span>email is required</span>
        }

        if (errors.email.type === "minLength") {
            return <span>email is too short (min. 3)</span>
        }
    })()

    return (
        <>
            <h2>What's your name</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="email">Email: </label>
                    <input type="text" placeholder="itachi" {...register("email", emailConfig)} />
                    {errorMessage}
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password: </label>
                    <input type="password" {...register("password")} />
                </fieldset>
                <button type="submit" disabled={loading}>Continue</button>


                {loading && <p>Logging in... </p>}
                {apiError && <p> {apiError} </p>}
            </form>
        </>
    );
};

export default LoginForm