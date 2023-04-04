// hooks
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
// firebase
import { Timestamp } from 'firebase/firestore';
import { useFirestore } from '../../hooks/useFirestore';
// styles
import styles from './CommentForm.module.css'

const CommentForm = ({ image, commentInput }) => {
    const [newComment, setNewComment] = useState('');
    const { user } = useAuthContext();
    const { updateDocument } = useFirestore('images');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentToAdd = {
            displayName: user.displayName,
            userId: user.uid,
            content: newComment,
            createdAt: Timestamp.fromDate(new Date()),
            id: Math.random()
        };
        updateDocument(image.id, { comments: [ ...image.comments, commentToAdd ] });
        setNewComment('');
    };

    return (
        <div>
            <form className={styles.add} onSubmit={handleSubmit}>
                <input type='text' onChange={(e) => setNewComment(e.target.value)} value={newComment} placeholder='Add comment...' autoComplete='off' ref={commentInput} />
                <button className='btn' disabled={newComment.length === 0}>Post</button>
            </form>
        </div>
    );
};

export default CommentForm;