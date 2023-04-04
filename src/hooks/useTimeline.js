// hooks
import { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { useAuthContext } from './useAuthContext';
// firebase
import { db } from '../firebase/config';
import { doc, getDoc, collection, where, orderBy, query, getDocs } from 'firebase/firestore';

export const useTimeline = () => {
    const [images, setImages] = useState([]);
    const [signedInUser, setSignedInUser] = useState(null);
    const [followedUsers, setFollowedUsers] = useState([]);
    const { user } = useAuthContext(); 

    useDeepCompareEffect(() => {
        const getImages = async () => {
            // 1) Get signed in user
            const docSnap = await getDoc(doc(db, 'users', user.uid));
            setSignedInUser(docSnap.data())
            
            // 2) Find all users followed by signed in user
            let followedUsers = [];
            signedInUser?.following.map(async (userId) => {
                const followedUser = await getDoc(doc(db, 'users', userId));
                followedUsers.push({ ...followedUser.data(), id: followedUser.id });
            })
            setFollowedUsers(followedUsers);
            
            // 3) Create reference on images collection where owner of image (userId) is in signedInUser following array
            let ref = collection(db, 'images');
            ref = query(ref, where("userId", "in", signedInUser?.following ? signedInUser.following : [""]), orderBy("createdAt", "desc"));

            // 4) Get all those images of users that are followed
            const querySnapshot = await getDocs(ref);
            let results = [];
            querySnapshot.forEach((doc) => {
                results.push({ ...doc.data(), id: doc.id });
            });
            setImages(results);
        };
        getImages();
    }, [signedInUser, user]);

    return { images, followedUsers };
};
