// hooks
import { useReducer, useEffect, useState } from 'react';
// firebase
import { setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
};

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
};

export const useFirestore = (c) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // const collectionRef = collection(db, c);

    // Only dispatch is not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
        dispatch(action)
        }
    };

    // Add a document
    const addDocument = async (id, document) => {
        dispatch({ type: 'IS_PENDING' });
        try {
            const addedDocument = await setDoc(doc(db, c, id), document);
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
        }
    };

    // Delete a document
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' });
        try {
            await deleteDoc(doc(db, c, id));
            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
        }
        catch (err) {
        dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not delete.' });
        }
    };

    useEffect(() => {
        return () => setIsCancelled(true)
    }, []);
    

    return { addDocument, deleteDocument, response };
};