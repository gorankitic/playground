// hooks
import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
// firebase
import { storage, db } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, Timestamp } from 'firebase/firestore';


export const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        const uploadFile = async () => {
            // Reference to images collection
            const imagesRef = collection(db, 'images');

            // Upload image
            // 1) Create upload path where to put image in storage
            const uploadPath = `images/${user.uid}/${file.name}`;
            // 2) Create reference to that storage 
            const storageRef = ref(storage, uploadPath);
            // 3)Upload image
            const uploadTask = uploadBytesResumable(storageRef, file);
            // 4) Register three observers:
            // 4.1) 'state_changed' observer, called any time the state changes
            // 4.2) Error observer, called on failure
            // 4.3) Completion observer, called on successful completion
            uploadTask.on('state_changed', (snapshot) => {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(percentage);
            }, (error) => {
                setError(error);
            }, async () => {
                const imgURL = await getDownloadURL(storageRef);
                setUrl(imgURL);
                // Create a image document in firestore collection images
                await addDoc(imagesRef, { userId: user.uid, photoURL: imgURL, createdAt: Timestamp.fromDate(new Date()), comments: [], likes: [] });
            });
        };
        uploadFile();
    }, [file, user.uid]);

    return { url, progress, error }
};

