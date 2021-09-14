import React, { useState } from 'react';


import styles from './index.module.scss';

export const RoomForm = () => {

    const [roomName, setRoomName] = useState("");
    const [maxPlayers, setMaxPlayers] = useState(2);

    const createRoom = () => {
        //TODO: get the host for create a new room
        console.log(roomName, maxPlayers)
    }

    return(
        <div className={styles.container}>
            <div className={styles.createGame}>
                <h1>Create Game</h1>
                <input 
                    className={styles.input}
                    type="text" 
                    value={roomName} 
                    onChange={e => setRoomName(e.target.value)} 
                    placeholder="Room name">
                </input>
                <input
                    className={styles.input}
                    type="number"
                    value={maxPlayers}
                    onChange={e => setMaxPlayers(e.target.value)}
                    max={5}
                    min={2}>
                </input>
                <button className={styles.btn} onClick={createRoom}>Crate Room</button>
            </div>
        </div>
    );
};

export default RoomForm;