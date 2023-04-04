// hooks
import { useState, useEffect } from 'react';
// firebase
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
// context
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            // Login
            const res = await signInWithEmailAndPassword(auth, email, password);
           
            // Dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user });

            // Update state
            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        }
        catch (err) {
            if (!isCancelled) {
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    useEffect(() => {
        setIsCancelled(false);
        return () => setIsCancelled(true)
    }, []);

    return { login, isPending, error };
};