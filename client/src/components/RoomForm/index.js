import React, { useState } from 'react';

export const RoomForm = () => {

    const [roomName, setRoomName] = useState("");
    const [maxPlayers, setMaxPlayers] = useState(2);

    const createRoom = () => {
        //TODO: get the host for create a new room
        console.log(roomName, maxPlayers)
    }

    return(
        <div>
            <h1>Create Game</h1>
            <input 
                type="text" 
                value={roomName} 
                onChange={e => setRoomName(e.target.value)} 
                placeholder="Room name">
            </input>
            <input
                type="number"
                value={maxPlayers}
                onChange={e => setMaxPlayers(e.target.value)}
                max={5}
                min={2}>
            </input>
            <button onClick={createRoom}>Crate Room</button>
        </div>
    );
};

export default RoomForm;