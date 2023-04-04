// components
import { Link } from 'react-router-dom';
// assets
import Play from '../../assets/play.svg';
import Login from '../../assets/login.svg';
import User from '../../assets/user.svg';
import Notification from '../../assets/notification.svg';
// styles
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <ul>
                <li className={styles.logo}>
                    <img src={Play} alt='playground logo' />
                    <Link to='/'>playground</Link>
                </li>
                <li><p>hi, stranger</p></li>
                <>
                    <li className={styles.icons}>
                        <img src={Login} alt='login icon' />
                        <Link to='/login'>Login</Link>
                    </li>
                    <li><Link to='/signup'>Signup</Link></li>
                </>
                <li className={styles.icons}>
                    <img src={User} alt='user profile icon' />
                    <Link to='/'>Profile</Link>
                </li>
                <li className={styles.notification}>
                    <img src={Notification} alt='notification icon' />
                </li>
                <li>
                    <button className='btn'>Logout</button>
                    {/* <button className='btn' disabled>Logging out</button> */}
                </li>
        </ul>
        </div>
    );
};

export default Navbar;