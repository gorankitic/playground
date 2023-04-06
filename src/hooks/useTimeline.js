// hooks
import { useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';
// firebase
import { db } from '../firebase/config';
import { collection, where, orderBy, query, getDocs, getDoc, doc } from 'firebase/firestore';

export const useTimeline = () => {
    const [images, setImages] = useState([]);
    const { user } = useAuthContext(); 

    useEffect(() => {
        const getImages = async () => {
            // 1) Find all users that signedIn user is following
            const  followingRef = collection(db, `following/${user.uid}/followingUsers`);
            const followingSnapshot = await getDocs(followingRef);
            let followedUsers = [];
            followingSnapshot.forEach((doc) => {
                followedUsers.push(doc.id);
            });

            // 2) Query all images where userId is in the followedUsers array
            let imagesRef = collection(db, 'images');
            imagesRef = query(imagesRef, where("userId", "in", followedUsers), orderBy("createdAt", "desc"));
            const imagesSnapshot = await getDocs(imagesRef);
            
            // 3) Get followedUser data (displayName, photoURL) and push it to image doc
            //    For POST component
            const resultsPromises = imagesSnapshot.docs.map(async(document) => {
                const userDoc = await getDoc(doc(db, 'users', document.data().userId))
                return { ...document.data(), id: document.id, displayName: userDoc.data().displayName, profilePhotoURL: userDoc.data().photoURL };
            });
            const results = await Promise.all(resultsPromises);
            setImages(results);
        };
        getImages();
    }, [user]);

    return { images };
};
