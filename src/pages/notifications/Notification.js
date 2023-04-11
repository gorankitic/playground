// hooks
import { useNavigate } from 'react-router-dom';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFetch } from '../../hooks/useFetch';
//components
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Link } from 'react-router-dom';
// styles
import styles from  './Notification.module.css';
import { useEffect } from 'react';

const Notification = () => {
    const { user } = useAuthContext();
    const { postData } = useFetch('https://us-central1-playground-b7315.cloudfunctions.net/markNotificationRead', 'POST');
    const navigate = useNavigate();
    const { documents: notifications} = useCollection(`users/${user.uid}/notifications`, ["userId", "==", user.uid], ["createdAt", "desc"]);
    const { documents: unreadNotifications, count } = useCollection(`users/${user.uid}/notifications`, ["read", "==", false]);

    useEffect(() => {
        if(unreadNotifications && count > 0) {
            let unreadNotificationIds = unreadNotifications.map(notif => {
                return notif.id;
            });
            postData({ userId: user.uid, unreadNotificationIds });
        }
        // eslint-disable-next-line
    }, [unreadNotifications]);

    const handleClick = (imageId) => {
        navigate(`/post/${imageId}`);
    };

    return (
        <div className={styles.notifications}>
            <Link to='/' className={styles.back}>Go Back</Link>
            <h2>Notifications</h2>
            {notifications && notifications.map(notification => (
                <div className={styles.notification} key={notification.id}>
                    <img src={notification.profilePhotoURL} alt="user thumbnail" className={styles.thumbnail} />
                    <Link to={`/${notification.follower}`} className={styles.name}>{notification.displayName}</Link>
                    <p>{notification.content}</p>
                    {notification.imageURL && <img src={notification.imageURL} onClick={() => handleClick(notification.imageId)} alt='thumbnail' className={styles.imagethumbnail}/>}
                    <p className={styles.date}>{formatDistanceToNow(notification.createdAt.toDate(), { addSuffix: true })}</p>
                </div>
            ))}
        </div>
    );
};

export default Notification;