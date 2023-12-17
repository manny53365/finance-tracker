import { useState } from 'react'
import styles from './Login.module.css'

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email, password)
    }

    return (
        <form onSubmit={handleSubmit} className={styles['login-form']}>
            <h2>Log in</h2>
            <label>
                <span>Email:</span>
                <input
                type="email" 
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                />
            </label>
            <label>
                <span>Password:</span>
                <input
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                />
            </label>
            <button className='btn'>Login</button>
        </form>
    )
}