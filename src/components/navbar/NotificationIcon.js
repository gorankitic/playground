// hooks
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
// styles
import styles from './NotificationIcon.module.css';
import Notification from '../../assets/notification.svg';
import { useEffect } from 'react';

const NotificationIcon = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { count: notificationCount } = useCollection(`users/${user.uid}/notifications`, ["read", "==", false]);

    useEffect(() => {
    }, [notificationCount]);

    return (
        <div className={styles.container} onClick={() => navigate(`/notifications/${user.uid}`)}>
            <img src={Notification} alt='notification icon' className={styles.icon} />
            <span className={styles.count}>{notificationCount}</span>
        </div>
    );
};

export default NotificationIcon;