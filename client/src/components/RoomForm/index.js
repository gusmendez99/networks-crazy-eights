import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRoom } from '../../hooks/useRoom';
import { SocketEvents, DEFAULT_ROUNDS } from '../../settings';


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
        <div>
            <h1>Create Game</h1>
            <input type="text" placeholder="Name" value={username} onChange={e => setUsername(e.target.value)}/>
            <button onClick={() => createRoom()}>Create Room</button>
        </div>
    );
};

export default RoomForm;