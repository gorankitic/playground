// hooks
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
//components
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Link } from 'react-router-dom';
// styles
import styles from  './Notification.module.css';

const Notification = () => {
    const { user } = useAuthContext();
    const { documents: notifications} = useCollection(`users/${user.uid}/notifications`, ["userId", "==", user.uid], ["createdAt", "desc"]);

    return (
        <div className={styles.notifications}>
            <Link to='/' className={styles.back}>Go Back</Link>
            <h2>Notifications</h2>
            {notifications && notifications.map(notification => (
                <div className={styles.notification} key={notification.id}>
                    <img src={notification.photoURL} alt="user thumbnail" className={styles.thumbnail} />
                    <Link to={`/${notification.follower}`} className={styles.name}>{notification.displayName}</Link>
                    <p>{notification.content}</p>
                    <p className={styles.date}>{formatDistanceToNow(notification.createdAt.toDate(), { addSuffix: true })}</p>
                </div>
            ))}
        </div>
    );
};

export default Notification;