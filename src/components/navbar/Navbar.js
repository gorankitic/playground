// components
import { Link } from 'react-router-dom';
import NotificationIcon from './NotificationIcon';
// hooks
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
// assets
import Play from '../../assets/play.svg';
import Login from '../../assets/login.svg';
import User from '../../assets/user.svg';
// styles
import styles from './Navbar.module.css';

const Navbar = () => {
    const { user } = useAuthContext();
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
                            <NotificationIcon />
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