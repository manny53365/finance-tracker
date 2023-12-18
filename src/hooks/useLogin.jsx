import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogin = async () => {
    const [isCanceled, setIsCanceled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        try {
            const loginRes = await projectAuth.signInWithEmailAndPassword(email, password);

            dispatch({type: 'LOGIN', payload: loginRes.user})

            if(!isCanceled){
                setIsPending(false);
                setError(null);
            };

        } catch (err) {
            if (!isCanceled){
                console.log(err.message)
                setError(err.message)
            };
        }
    }

    useEffect(() => {
        return () => setIsCanceled(true);
    }, [])

    return { login, error, isPending }
}
