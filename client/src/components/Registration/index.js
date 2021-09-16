import React, { useState, useEffect } from 'react';
import { useRoom } from '../../hooks/useRoom';
import { SocketEvents, DEFAULT_ROUNDS } from '../../settings';

import styles from './index.module.scss';

export const Registration = () => {
    const { mySocket } = useRoom();
    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");
    const rounds = DEFAULT_ROUNDS;

    useEffect(() => {
        // console.log('My socket is ', mySocket);
    }, [mySocket])

    const handleJoinRoom = () => {
        mySocket.emit(SocketEvents.ROOM_CREATE_OR_JOIN, { username, roomId, isNew: false, rounds })
    }

    return (
        <div className={styles.container}>
            <div className={styles.registration}>
                <h1>¡Welcome!</h1>
                <p>Please choose a username</p>
                <div className="">
                    <input className={styles.input} type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                    <input className={styles.input} type="text" placeholder="Room ID" value={roomId} onChange={e => setRoomId(e.target.value)}/>
                    <button className={styles.btn} onClick={() => handleJoinRoom()}>Join Game</button>
                </div>
            </div>
        </div>
    );

};

export default Registration;