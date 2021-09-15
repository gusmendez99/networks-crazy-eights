import React from 'react';
import { useRoom } from '../../hooks/useRoom';

export const WaitingRoom = () => {
    const { room, isOwner, players } = useRoom();

    return(
        <div>
            <h1>Waiting Room</h1>
            <h3>Room ID: {room}</h3>
            <ul>
            {
                players.map(({ socketId, username }) => (
                    <li key={socketId}>{username}</li>
                ))
            }
            </ul>
            {
                isOwner && (<button> Empezar </button>)
            }
        </div>
    );
}

export default WaitingRoom;