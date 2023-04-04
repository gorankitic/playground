// hooks
import { useTimeline } from '../../hooks/useTimeline';
// components
import SearchBar from '../../components/search/SearchBar';
import Post from '../../components/post/Post';
// styles
import styles from './Timeline.module.css';

const Timeline = () => {
  const { images, followedUsers } = useTimeline();
  
  return (
    <div className={styles.timeline}>
      <SearchBar />

      {images && images.map((image) => (
        // eslint-disable-next-line
        followedUsers && followedUsers.map((user) => {
          if (image.userId === user.id) {
            return (
                <div key={image.id}>
                  <Post imageId={image.id} followedUser={user} />
                </div>
            )
          }
        })
      ))}
    </div>
  );
}

export default Timeline;