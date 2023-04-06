// // hooks
import { useRef } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useCollection } from '../../hooks/useCollection';
// components
import { Link } from 'react-router-dom';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// assets
import Like from '../../assets/like.svg';
import RedHeart from '../../assets/like-red.svg';
import Comment from '../../assets/comment.svg';
// style
import styles from './Post.module.css';
// framer-motion
import { motion } from 'framer-motion';


const Post = ({ image }) => {
    const { user } = useAuthContext();
    const commentInput = useRef(null);
    // Add or remove document in likes subcollection
    const { setDocument, deleteDocument } = useFirestore(`images/${image.id}/likes`);
    // To conditionaly render like/unlike button find did signedIn user liked image
    const { count } = useCollection(`images/${image.id}/likes`, ["userId", "==", user.uid]);
    // Total number of image likes
    const { count: likes } = useCollection(`images/${image.id}/likes`, ["imageId", "==", image.id]);

    const handleLike = () => {
        setDocument(user.uid, { userId: user.uid, imageId: image.id });
    };

    const handleUnlike = () => {
        deleteDocument(user.uid);
    };

    const handleFocus = () => {
        commentInput.current.focus();
    };

    return ( 
        <div className={styles.post}>
            <div className={styles.header}>
                <img src={image.profilePhotoURL} alt="small header post" />
                <Link to={`/${image.userId}`} className={styles.link}>{image.displayName}</Link>
            </div>
            <img src={image.photoURL} alt="enlarged user timeline" />
            <div className={styles.icons}>
                { count === 0 && <motion.img src={Like} alt="like icon" onClick={handleLike} initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.2}} />}
                { count === 1 && <motion.img src={RedHeart} alt="liked red heart icon" onClick={handleUnlike} initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.2}} />}
                <img src={Comment} alt="comment icon" onClick={handleFocus} />
                <p>{formatDistanceToNow(image.createdAt.toDate(), { addSuffix: true })}</p>
            </div>
            <div className={styles.likes}>
                {likes === 1 ? <p>{likes} like</p> : <p>{likes} likes</p>}
            </div>
            <CommentsList imageId={image.id} />    
            <CommentForm imageId={image.id} commentInput={commentInput} />
        </div>    
    )
}

export default Post