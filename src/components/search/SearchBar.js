// hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// styles
import styles from './SearchBar.module.css';

const SearchBar = () => {
    const [word, setWord] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // query parameter: ?q=
        navigate(`/search?q=${word}`);
    };

    return (
        <div className={styles.searchbar}>
            <form onSubmit={handleSubmit}> 
                <input type='text' onChange={(e) => setWord(e.target.value)} required placeholder='Find friends' />
            </form> 

        </div>
    );
};

export default SearchBar;