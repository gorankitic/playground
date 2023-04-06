// hooks
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
// firebase
import { Timestamp } from 'firebase/firestore';
import { useFirestore } from '../../hooks/useFirestore';
// styles
import styles from './CommentForm.module.css'

const CommentForm = ({ imageId, commentInput }) => {
    const [newComment, setNewComment] = useState('');
    const { user } = useAuthContext();
    const { addDocument } = useFirestore(`images/${imageId}/comments`);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            userId: user.uid,
            imageId,
            content: newComment,
            createdAt: Timestamp.fromDate(new Date()),
            id: Math.random()
        };
        addDocument(commentToAdd);
        setNewComment('');
    };

    return (
        <div>
            <form className={styles.add} onSubmit={handleSubmit}>
                <input type='text' onChange={(e) => setNewComment(e.target.value)} value={newComment} placeholder='Add comment...' autoComplete='off' ref={commentInput} />
                <button className={styles.btn} disabled={newComment.length === 0}>Post</button>
            </form>
        </div>
    );
};

export default CommentForm;