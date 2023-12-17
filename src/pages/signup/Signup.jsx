import { useState } from 'react';
import styles from './Signup.module.css'

export default function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email, password, displayName)
    }

    return (
        <form onSubmit={handleSubmit} className={styles['signup-form']}>
            <h2>Sign up</h2>
            <label><span>Email:</span></label>
            <input
            type="email" 
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            />
            <label><span>Password:</span></label>
            <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            />
            <label><span>Display name:</span></label>
            <input 
            type="text"
            onChange={(event) => setDisplayName(event.target.value)}
            value={displayName}
            />
            <button className='btn'>Login</button>
        </form>
    )
}