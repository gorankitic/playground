// hooks
import { useRef } from 'react';
// components
import Header from './Header';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';
// import { LazyLoadImage } from 'react-lazy-load-image-component';

// style
import styles from './Post.module.css';
import LikeSection from './LikeSection';


const Post = ({ image }) => {
    const commentInput = useRef(null);

    return ( 
        <div className={styles.post}>
            <Header image={image} />
            <img src={image.photoURL} alt="enlarged user timeline" className={styles.image} />
            <LikeSection image={image} commentInput={commentInput} />
            <CommentsList imageId={image.id} />    
            <CommentForm imageId={image.id} commentInput={commentInput} />
        </div>    
    );
};

export default Post;