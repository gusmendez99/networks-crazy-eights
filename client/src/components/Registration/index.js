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
        <div className="container">
            <h1>¡Welcome!</h1>
            <div className="">
                <input type="text" placeholder="Name" value={username} onChange={e => setUsername(e.target.value)}/>
                <input type="text" placeholder="Room ID" value={roomId} onChange={e => setRoomId(e.target.value)}/>
                <button onClick={() => handleJoinRoom()}>Join Game</button>
            </div>
        </div>
    );

};

export default Registration;