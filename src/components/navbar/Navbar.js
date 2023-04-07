// components
import { Link } from 'react-router-dom';
// hooks
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
// assets
import Play from '../../assets/play.svg';
import Login from '../../assets/login.svg';
import User from '../../assets/user.svg';
import Notification from '../../assets/notification.svg';
// styles
import styles from './Navbar.module.css';

const Navbar = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { logout, isPending } = useLogout();

    return (
        <div className={styles.navbar}>
            <ul>
                <li className={styles.logo}>
                    <img src={Play} alt='playground logo' />
                    <Link to='/'>playground</Link>
                </li>
                {user && <li><p>hi, {user.displayName}</p></li>}
                {!user &&
                    <>
                        <li className={styles.icons}>
                            <img src={Login} alt='login icon' />
                            <Link to='/login'>Login</Link>
                        </li>
                        <li><Link to='/signup'>Signup</Link></li>
                    </>
                }
                {user &&
                    <>
                        <li className={styles.icons}>
                            <img src={User} alt='user profile icon' />
                            <Link to={`/${user.uid}`}>Profile</Link>
                        </li>
                        <li className={styles.notification}>
                            <img src={Notification} alt='notification icon' onClick={() => navigate(`/notifications/${user.uid}`)} />
                        </li>
                        <li>
                            {!isPending &&<button className='btn' onClick={logout}>Logout</button>}
                            {isPending &&<button className='btn' disabled>Logging out</button>}
                        </li>
                    </>
                }
            </ul>
        </div>
    );
};

export default Navbar;