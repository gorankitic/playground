// firebase
import { setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config'; 

export const useFirestore = (c) => {

    const addDocument = async (userId) => {
        let docRef = doc(db, c, userId);
        await setDoc(docRef, { userId });
    };

    const deleteDocument = async (uid) => {
        await deleteDoc(doc(db, c, uid));
    };

    const updateDocument = async (uid, updates) => {
        const docRef = doc(db, c, uid);
        await updateDoc(docRef, updates);
    };

    return { addDocument, updateDocument, deleteDocument };
};