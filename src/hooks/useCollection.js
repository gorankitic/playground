// hooks
import { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
// firebase
import { collection, onSnapshot, where, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useCollection = (c, q, o) => {
    const [documents, setDocuments] = useState(null);
    const [count, setCount] = useState(0);
    
    useDeepCompareEffect(() => {
        let ref = collection(db, c);

        if(q && o) {
            ref = query(ref, where(...q), orderBy(...o));
        } else if (q) {
            ref = query(ref, where(...q));
        }
    
        const unsubscribe = onSnapshot(ref, (snapshot) => {
            let results = [];
            snapshot.docs.forEach((doc) => {
                results.push({ ...doc.data(), id: doc.id });
            });
            setDocuments(results);
            
            setCount(results.length);
        });

        return () => unsubscribe();
        
    }, [c, q, o]); 
    
    return { documents, count };
};