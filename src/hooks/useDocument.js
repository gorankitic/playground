// hooks
import { useState, useEffect } from 'react';
// firebase
import { db } from '../firebase/config';
import { onSnapshot, doc } from 'firebase/firestore';

export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);

    // Realtime data for document
    useEffect(() => {
        const docRef = doc(db, collection, id);

        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            if(snapshot.data()) {
                setDocument({ ...snapshot.data(), id: snapshot.id });
                setError(null);
            } else {
                setError('No document with that id.');
            }
        }, (err) => {
            console.log(err.message);
            setError('Failed to get document.');
        });

        return () => unsubscribe();

    }, [collection, id]);

    return { document, error };
};