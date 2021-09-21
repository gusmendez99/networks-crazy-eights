import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRoom } from '../../hooks/useRoom';
import { SocketEvents, DEFAULT_ROUNDS } from '../../settings';

import styles from './index.module.scss';

export const RoomForm = () => {
    const { mySocket } = useRoom();
    const [username, setUsername] = useState("");
    const rounds = DEFAULT_ROUNDS;
    
    useEffect(() => {
        
    }, [mySocket])

    const createRoom = () => {
        const roomId = uuidv4();
        mySocket.emit(SocketEvents.ROOM_CREATE_OR_JOIN, { username, roomId, isNew: true, rounds });
        
    }

    return(
        <div className={styles.container}>
            <div className={styles.createGame}>
                <h1>Create Game</h1>
                <input 
                    className={styles.input}
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    placeholder="Your username">
                </input>
                <button className={styles.btn} onClick={() => createRoom()}>Create Room</button>
            </div>
        </div>
    );
};

export default RoomForm;