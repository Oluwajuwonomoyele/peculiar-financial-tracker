import { useState } from "react"
import { auth } from "../firestore/config"
import { useAuthContext } from "./useAuthContext"


export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await auth.signInWithEmailAndPassword(email, password)
            dispatch({type: 'LOGIN', payload: res.user})

            setIsPending(false)
            setError(null)
        } catch (error) {
            console.log(error.message)
            setError(error.message)
            setIsPending(false) 
        }
    }

    return { error, login, isPending }
}