// components
import { Link } from 'react-router-dom';
import LikeSection from '../../components/post/LikeSection';
import CommentsList from '../../components/post/CommentsList';
import CommentForm from '../../components/post/CommentForm';
// hooks
import { useRef } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import { useNavigate } from 'react-router-dom';
import { useFirestore } from '../../hooks/useFirestore';
// styles
import styles from './PostPage.module.css';
// firebase
import { storage } from '../../firebase/config';
import { ref, deleteObject } from 'firebase/storage';

const PostPage = () => {
    const { user } = useAuthContext();
    const { postId } = useParams();
    const navigate = useNavigate();
    const { document: image } = useDocument('images', postId);
    const { deleteDocument } = useFirestore('images');
    const commentInput = useRef(null);
    
    const handleDelete = () => {
        const imageRef = ref(storage, image.photoURL);
        deleteObject(imageRef)
            .then(() => console.log("Image deleted."))
            .catch((error) => console.log(error.message));

        deleteDocument(postId);        
        navigate(`/${user.uid}`);
    };

    return (
        <div className={styles.page}>
            {image && (
                <>
                    <div className={styles.actions}>
                        <Link to={`/${image.userId}`} className={styles.back}>Go Back</Link>
                        { user.uid === image.userId && <button className={styles.delete} onClick={handleDelete}>Delete Photo</button> }
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