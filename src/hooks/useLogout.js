import { useState } from "react"
import { auth } from "../firestore/config"
import { useAuthContext } from "./useAuthContext"


export const useLogout = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        try {
            await auth.signOut()
            dispatch({type: 'LOGOUT'})
            setIsPending(false)
            setError(null)
        } catch (error) {
            console.log(error.message)
            setError(error.message)
            setIsPending(false)
        }
    }


    return { error, logout, isPending }
}