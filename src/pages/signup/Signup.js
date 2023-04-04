// hooks
import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
// styles
import styles from  './Signup.module.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [profilePhotoError, setProfilePhotoError] = useState(null);
    const { signup, error, isPending } = useSignup();

    const handleFileChange = (e) => {
        setProfilePhoto(null);
        let selected = e.target.files[0];

        if (!selected) {
            setProfilePhotoError('Please select a file.');
            return;
        }
        if (!selected.type.includes('image')) {
            setProfilePhotoError('Selected file must be an image.');
            return;
        }
        setProfilePhotoError(null);
        setProfilePhoto(selected);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        signup(email, password, userName, profilePhoto);
    };

    return (
        <form className='auth-form' onSubmit={submitHandler}>
            <h2>SIGN UP TO PLAYGROUND</h2>
            <label>
                <span>Email:</span>
                <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} required />
            </label>
            <label>
                <span>Password:</span>
                <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} required />
            </label>
            <label>
                <span>User name:</span>
                <input type='text' onChange={(e) => setUserName(e.target.value)} value={userName} required />
            </label>
            <span>Profile photo:</span>
            <label className='upload-label'>
                <span>Upload</span>
                <input className='upload-btn' type='file' onChange={handleFileChange} required />
                {profilePhotoError && <div className='error'>{profilePhotoError}</div>}
            </label>
            {!isPending && <button className='btn'>Sign Up</button>}
            {isPending && <button className='btn' disabled>Loading</button>}
            {error && <div className='error'>{error}</div>}
        </form>
    );
}

export default Signup;