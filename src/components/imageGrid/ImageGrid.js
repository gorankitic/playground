// styles
import styles from './ImageGrid.module.css';
// framer-motion
import { motion } from 'framer-motion';

const ImageGrid = ({ setSelectedImg, documents }) => {

    return (
        <div className={styles.grid}>
            {documents && documents.map(doc => (
                <motion.div className={styles.wrap} key={doc.id} onClick = {() => setSelectedImg(doc)} layout>
                    <motion.img src={doc.photoURL} alt='single small grid photograph' initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 1}} className={styles.image} />
                </motion.div>
            ))}
        </div>
    );
};

export default ImageGrid;