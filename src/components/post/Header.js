// components
import { Link } from 'react-router-dom';
// styles
import styles from './Header.module.css';


const Header = ({ image }) => {
    return (
        <div className={styles.header}>
            <img src={image.profilePhotoURL} className={styles.profileImg} alt="small header post" />
            <Link to={`/${image.userId}`} className={styles.link}>{image.displayName}</Link>
        </div>
    );
};

export default Header;