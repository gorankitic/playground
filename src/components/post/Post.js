// hooks
import { useRef } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useDocument } from '../../hooks/useDocument';
// components
import { Link } from 'react-router-dom';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// assets
import Like from '../../assets/like.svg';
import RedHeart from '../../assets/like-red.svg';
import Comment from '../../assets/comment.svg';
// style
import styles from './Post.module.css';
// framer-motion
import { motion } from 'framer-motion';

const Post = ({ imageId, followedUser }) => {
    const { user } = useAuthContext();
    const { updateDocument } = useFirestore('images');
    const { document: image } = useDocument('images', imageId);
    const commentInput = useRef(null);

    const handleLike = () => {
        updateDocument(image.id, { likes: [ ...image.likes, user.uid] });
    };

    const handleUnlike = () => {
        const likesArray = image.likes.filter((userId) => userId !== user.uid);
        updateDocument(image.id, { likes: likesArray });
    }

    const handleFocus = () => {
        commentInput.current.focus();
    };
    
    return ( 
        <div className={styles.post}>
            {image && (
                <>
                    <div className={styles.header}>
                        <img src={followedUser.photoURL} alt="small header post" />
                        <Link to={`/${image.userId}`}>{followedUser.displayName}</Link>
                    </div>
                    <LazyLoadImage src={image.photoURL} alt="enlarged user timeline" />
                    <div className={styles.icons}>
                        {!image.likes.includes(user.uid) && <motion.img src={Like} alt="like icon" onClick={handleLike} initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.2}} />}
                        {image.likes.includes(user.uid) && <motion.img src={RedHeart} alt="liked red heart icon" onClick={handleUnlike} initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.2}} />}
                        <img src={Comment} alt="comment icon" onClick={handleFocus} />
                        <p>{formatDistanceToNow(image.createdAt.toDate(), { addSuffix: true })}</p>
                    </div>
                    <div className={styles.likes}>
                        {image.likes.length !== 1 ? <p>{image.likes.length} likes</p> : <p>{image.likes.length} like</p>}
                    </div>
                    <>
                        {image.comments.length > 0 && <CommentsList comments={image.comments} />}
                    </>
                    <CommentForm image={image} commentInput={commentInput} />
                </>
            )}
        </div>    
    )
}

export default Post