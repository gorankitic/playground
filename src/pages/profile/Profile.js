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
    const { count, documents } = useCollection('images', ["userId", "==", uid], ["createdAt", "desc"]);
    // Add following and followers to handle follow
    const { addDocument: addFollowing } = useFirestore(`following/${user.uid}/followingUsers`);
    const { addDocument: addFollowers } = useFirestore(`followers/${uid}/userFollowers`);
    // Count following and followers
    const { count: followingCount } = useCollection(`following/${uid}/followingUsers`, ["userId", "==", uid]);
    const { count: followersCount } = useCollection(`followers/${uid}/userFollowers`, ["userId", "==", uid]);
    // To conditionaly render follow/unfollow button find did signedInUser follow currentUser
    const { count: countOne } = useCollection(`following/${user.uid}/followingUsers`, ["followingUserId", "==", uid]);
    // Remove following and followers to handle unfollow
    const { deleteDocument: removeFollowing } = useFirestore(`following/${user.uid}/followingUsers`);
    const { deleteDocument: removeFollowers } = useFirestore(`followers/${uid}/userFollowers`);
    
    const handleFollow = () => {
       addFollowing(uid, { userId: user.uid, followingUserId: uid });
       addFollowers(user.uid, { userId: uid, followingUserId: user.uid });
    };

    const handleUnfollow = () => {
        removeFollowing(uid);
        removeFollowers(user.uid);
    };

    return (
        <div className={styles.profile}>
            {currentUser && (
                <>
                    <div className={styles.sidebar}>
                        <div className={styles.user}>
                            <img src={currentUser.photoURL} alt='user profile' />
                            <h1>{currentUser.displayName}</h1>
                            {user.uid !== uid && countOne === 0 && <button className='btn' onClick={handleFollow}>Follow</button>}
                            {user.uid !== uid && countOne === 1 && <button className='btn' onClick={handleUnfollow}>Unfollow</button>}
                            <p>{count} photos</p>
                            <p>{followersCount} followers</p>
                            <p>{followingCount} following</p>
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