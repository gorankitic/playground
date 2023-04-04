// hooks
import { useSearchParams, Link } from 'react-router-dom';
import { useCollection } from '../../hooks/useCollection';
// styles
import styles from './Search.module.css';

const Search = () => {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q');
    const { documents } = useCollection('users', ['displayName', '<=', q + '\uf8ff']);

    return (
        <div className={styles.search}>
            <p>Users with name: {q}</p>
            <div className={styles.users}>
                {documents && documents.map(doc => (
                    <div key={doc.id} className={styles.user}>
                        <img src={doc.photoURL} alt='user profile' />
                        <Link to={`/${doc.id}`}>{doc.displayName}</Link>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Search;