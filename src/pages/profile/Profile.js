// hooks
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useDocument } from '../../hooks/useDocument';
import { useParams } from 'react-router-dom';
import { useCollection } from '../../hooks/useCollection';
import { useFirestore } from '../../hooks/useFirestore';
// components
import ImageGrid from '../../components/imageGrid/ImageGrid';
import UploadForm from '../../components/upload/UploadForm';
import Modal from '../../components/imageGrid/Modal';
// styles
import styles from './Profile.module.css';

const Profile = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const { uid } = useParams();
    const { user } = useAuthContext();
    const { document: currentUser } = useDocument('users', uid);
    const { document: signedInUser } = useDocument('users', user.uid);
    const { count, documents } = useCollection('images', ["userId", "==", uid], ["createdAt", "desc"]);
    const { updateDocument } = useFirestore('users');

    const handleFollow = async () => {
        await updateDocument(user.uid, { following: [...signedInUser.following, currentUser.id] });
        await updateDocument(uid, { followers: [...currentUser.followers, signedInUser.id] });
    };

    const handleUnfollow = async () => {
        const newFollowing = signedInUser.following.filter((follower) => follower.id === currentUser.id);
        await updateDocument(user.uid, { following: newFollowing });
        const newFollowers = currentUser.followers.filter(follower => follower.id === signedInUser.id);
        await updateDocument(uid, { followers: newFollowers });
    };

    return (
        <div className={styles.profile}>
            {currentUser && (
                <>
                    <div className={styles.sidebar}>
                        <div className={styles.user}>
                            <img src={currentUser.photoURL} alt='user profile' />
                            <h1>{currentUser.displayName}</h1>
                            {user.uid !== uid && !currentUser.followers.includes(user.uid) && <button className='btn' onClick={handleFollow}>Follow</button>}
                            {user.uid !== uid && currentUser.followers.includes(user.uid) && <button className='btn' onClick={handleUnfollow}>Unfollow</button>}
                            <p>{count} photos</p>
                            <p>{0} followers</p>
                            <p>{0} following</p>
                        </div>
                        <UploadForm />
                    </div>
                    <ImageGrid setSelectedImg={setSelectedImg} documents={documents} />
                </>
            )}
            {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} user={currentUser} />}
        </div>
    );
};

export default Profile;