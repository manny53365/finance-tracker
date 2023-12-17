import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {

    const [isCanceled, setIsCanceled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signUp = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password);

            if (!res){
                throw new Error('could not complete sign up');
            }

            await res.user.updateProfile({displayName});

            dispatch({type: 'LOGIN', payload: res.user})

            if (!isCanceled){
                setIsPending(false);
                setError(null);
            }

        } catch (err) {
            if (!isCanceled){
                console.log(err.message)
                setError(err.message)
                setIsPending(false);
            }
        }
    }

    useEffect(() => {
        return () => setIsCanceled(true);
    }, [])

    return {error, isPending, signUp};

}