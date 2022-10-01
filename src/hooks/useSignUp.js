import { useState } from "react"
import { auth } from '../firestore/config'
import { useAuthContext } from "./useAuthContext"

export const useSignUp = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signUp = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await auth.createUserWithEmailAndPassword(email, password)
            if(!res){
                throw new Error('Could not complete signup')
            }
            await res.user.updateProfile({ displayName })
            dispatch({type: 'LOGIN', payload: res.user})
            setIsPending(false)
            setError(null)
        } catch (error) {
            console.log(error.message)
            setError(error.message)
            setIsPending(false)
        }
    }

    return { error, isPending, signUp}
}