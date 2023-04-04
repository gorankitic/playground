// hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// firebase
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
// context
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        try {
            // Sign the user out
            await signOut(auth);

            // Dispatch logout action
            dispatch({ type: 'LOGOUT' });

            // Navigate user back to main page which will redirect to login page
            navigate('/');

            // Update local state
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
    };

    useEffect(() => {
        setIsCancelled(false);
        return () => setIsCancelled(true)
    }, []);

    return { logout, error, isPending };
};