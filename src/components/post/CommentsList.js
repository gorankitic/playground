// hooks
import { useState } from 'react';
// components
import { Link } from 'react-router-dom';

// styles
import styles from './CommentsList.module.css';

const CommentsList = ({ comments }) => {
    const [ commentsSlice, setCommentsSlice ] = useState(3);

    const showNextComments = () => {
        setCommentsSlice(prev => prev + 3);
    };

    return (
        <div className={styles.comments}>
            <ul>
                {comments && comments.slice(0, commentsSlice).map(comment => (
                    <li key={comment.id}>
                        <div className={styles.comment}>
                            <Link to={`/${comment.userId}`}>{comment.displayName}</Link>
                            <p>{comment.content}</p>
                        </div>
                    </li>
                ))}
            </ul>
            {comments.length >= 3 && commentsSlice < comments.length && (
                <p onClick={showNextComments} className={styles.extend}>View more comments...</p>
            )}
        </div>

        
    );
};

export default CommentsList;