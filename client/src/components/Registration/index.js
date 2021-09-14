import React, { useState } from 'react';

import styles from './index.module.scss';

export const Registration = () => {

    const [username, setUsername] = useState("");

    const handleRegistration = () => {
        //TODO: send username to server via user registration
        console.log(username);
    }

    return (
        <div className={styles.container}>
            <div className={styles.registration}>
                <h1>¡Welcome!</h1>
                <p>Please choose a username</p>
                <div className="">
                    <input className={styles.input}type="text" placeholder="Name" value={username} onChange={e => setUsername(e.target.value)}/>
                    <button className={styles.btn} onClick={handleRegistration} >Start playing</button>
                </div>
            </div>
        </div>
    );

};

export default Registration;