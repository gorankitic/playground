// hooks
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
// styles
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <form className={styles.auth} onSubmit={handleSubmit}>
      <h2>LOGIN</h2>
      <label>
        <span>Email:</span>
        <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} required />
      </label>
      <label>
        <span>Password:</span>
        <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} required />
      </label>
      {!isPending && <button className='btn'>Login</button>}
      {isPending && <button className='btn' disabled>Loading</button>}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Login;