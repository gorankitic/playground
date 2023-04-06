// hooks
import { useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
// components
import { Link } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// styles
import styles from './CommentsList.module.css';

const CommentsList = ({ imageId }) => {
    const [ commentsSlice, setCommentsSlice ] = useState(3);
    const { documents: comments, count } = useCollection(`images/${imageId}/comments`, ["imageId", "==", imageId], ["createdAt", "desc"]); 

    const showNextComments = () => {
        setCommentsSlice(prev => prev + 3);
    };

    return (
        <div className={styles.comments}>
            <ul>
                {comments && comments.slice(0, commentsSlice).map(comment => (
                    <li key={comment.id}>
                        <div className={styles.comment}>
                            <Link to={`/${comment.userId}`} className={styles.link}>{comment.displayName}</Link>
                            <p>{comment.content}</p>
                            <p className={styles.date}>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>
                        </div>
                    </li>
                ))}
            </ul>
            {count >= 3 && commentsSlice < count && (
                <p onClick={showNextComments} className={styles.extend}>View more comments...</p>
            )}
        </div>
    );
};

export default CommentsList;