// styles
import styles from './Modal.module.css';
// framer-motion
import { motion } from 'framer-motion';

const Modal = ({ selectedImg, setSelectedImg, user }) => {

    const handleClick = (e) => {
        if(e.target.classList.contains('Modal_backdrop__g8nGK')) {
            setSelectedImg(null);
        }
    };

    return (
        <motion.div className={styles.backdrop} onClick={handleClick} initial={{opacity: 0}} animate={{opacity: 1}} > 
            <motion.img src={selectedImg.photoURL} alt="enlarged photograph" initial={{y: "-100vh"}} animate={{y: 0}}  />
        </motion.div>
    );
};

export default Modal;