// components
import { useNavigate } from 'react-router-dom';
// styles
import styles from './ImageGrid.module.css';
// framer-motion
import { motion } from 'framer-motion';

const ImageGrid = ({ documents }) => {
    const navigate = useNavigate();

    const handleClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    return (
        <div className={styles.grid}>
            {documents && documents.map(doc => (    
                <motion.div className={styles.wrap} key={doc.id} onClick={() => handleClick(doc.id)}  layout>
                    <motion.img 
                        className={styles.image} 
                        src={doc.photoURL}
                        alt='single small grid photograph' 
                        initial={{opacity: 0}} 
                        animate={{opacity: 1}} 
                        transition={{delay: 0.5}} 
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default ImageGrid;