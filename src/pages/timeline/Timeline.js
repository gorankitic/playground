// hooks

// components
import SearchBar from '../../components/search/SearchBar';

// styles
import styles from './Timeline.module.css';

const Timeline = () => {

    return (
        <div className={styles.timeline}>
            <SearchBar />
        </div>
    );
}

export default Timeline;