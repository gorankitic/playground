// hooks
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useParams } from 'react-router-dom';
// components
import ProgressBar from './ProgressBar';
// styles
import styles from './UploadForm.module.css'

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const { uid } = useParams();
    const { user } = useAuthContext();

    const types = ['image/png', 'image/jpeg', 'image/jpg'];

    const changeHandler = (e) => {
        let selected = e.target.files[0];
        if(selected && types.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError('Select an image file.');
        }
    };

    return (
        <form className={styles.form}>
            {user.uid === uid && (
                <label className={styles.label}>
                    <span>Upload A New Photo</span>
                    <input className={styles.button} type='file' onChange={changeHandler}  />
                    {error && <div className="error">{error}</div>}
                </label>
            )}
            {file && <ProgressBar file={file} setFile={setFile} />}
        </form>
    );
};

export default UploadForm;