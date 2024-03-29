// hooks
import { createContext, useEffect, useReducer } from 'react';
// firebase
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN': 
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true }
        default: 
            return state
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            dispatch({ type: 'AUTH_IS_READY', payload: user });
        });
        unsubscribe();
    }, []);

    console.log('AuthContext state:', state);
    
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};