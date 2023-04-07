// components
import { Link } from 'react-router-dom';
import LikeSection from '../../components/post/LikeSection';
import CommentsList from '../../components/post/CommentsList';
import CommentForm from '../../components/post/CommentForm';
// hooks
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
// styles
import styles from './PostPage.module.css';

const PostPage = () => {
    const { postId } = useParams();
    const { document: image } = useDocument('images', postId);
    const commentInput = useRef(null);

    return (
        <div className={styles.page}>
            {image && (
                <>
                    <div className={styles.actions}>
                        <Link to={`/${image.userId}`} className={styles.back}>Go Back</Link>
                        <button className={styles.delete}>Delete Photo</button>
                    </div>
                    <img src={image.photoURL} alt="enlarged user timeline" className={styles.image} />
                    <LikeSection image={image} commentInput={commentInput} />
                    <CommentsList imageId={image.id} />    
                    <CommentForm imageId={image.id} commentInput={commentInput} />
                </>
            )}
            
        </div>
    );
};

export default PostPage;