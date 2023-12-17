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
            <label>
                <span>Display name:</span>
                <input 
                type="text"
                onChange={(event) => setDisplayName(event.target.value)}
                value={displayName}
                />
            </label>
            <button className='btn'>Sign up</button>
        </form>
    )
}