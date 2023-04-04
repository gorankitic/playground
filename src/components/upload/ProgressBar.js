import React, { useEffect } from 'react';
// hooks
import { useStorage } from '../../hooks/useStorage';
// styles
import styles from './ProgressBar.module.css';
// framer-motion
import { motion } from 'framer-motion';

const ProgressBar = ({ file, setFile }) => {
    const { url, progress } = useStorage(file);

    useEffect(() => {
        if(url) {
            setFile(null);
        }
    }, [url, setFile])

    return (
        <motion.div className={styles.progressbar} initial={{width: 0}} animate={{width: progress + '%'}}></motion.div>
    );
};

export default ProgressBar;