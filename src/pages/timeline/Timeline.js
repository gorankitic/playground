// hooks
import { useTimeline } from "../../hooks/useTimeline";
// components
import SearchBar from '../../components/search/SearchBar';
import Post from '../../components/post/Post';
// styles
import styles from './Timeline.module.css';

const Timeline = () => {
    const { images } = useTimeline();

    return (
        <div className={styles.timeline}>
            <SearchBar />
            {images && images.map(image => (
                <div key={image.id}>
                    <Post image={image} />
                </div>
            ))}
        </div>
    );
};

export default Timeline;