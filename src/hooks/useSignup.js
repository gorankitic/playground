// hooks
import { useState, useEffect } from 'react';
// firebase
import { auth, storage, db } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
// context
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, displayName, profilePhoto) => {
        setError(null);
        setIsPending(true);

        try {
            // Signup
            const res = await createUserWithEmailAndPassword(auth, email, password);

            if (!res) {
                throw new Error('Could not complete signup.');
            }

            // Upload user profilePhoto
            // 1) Create upload path where to put profilePhotos in storage
            const uploadPath = `profilePhotos/${res.user.uid}/${profilePhoto.name}`;
            // 2) Create reference to that storage 
            const storageRef = ref(storage, uploadPath);
            // 3)Upload image
            await uploadBytes(storageRef, profilePhoto);
            // 4) Get downloadURL
            const imgURL = await getDownloadURL(storageRef);

            // Update user profile for authContext
            await updateProfile(auth.currentUser, { displayName, photoURL: imgURL });

            // Create a user document in users collection
            await setDoc(doc(db, 'users', res.user.uid), { displayName, photoURL: imgURL });

            // Dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user });

            // Update state
            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        } catch (err) {
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

    return { signup, error, isPending };
};