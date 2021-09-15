import React from 'react';
import { useRoom } from '../../hooks/useRoom';
import { SocketEvents } from '../../settings';

export const WaitingRoom = () => {
    const { mySocket, room, isOwner, players } = useRoom();

    const leaveRoom = () => {
        mySocket.emit(SocketEvents.ROOM_LEAVE, { roomId: room })
    }

    return(
        <div>
            <h1>Waiting Room</h1>
            <h3>Room ID: {room}</h3>

            <div>
                <button onClick={() => leaveRoom()}> Leave room </button>
            </div>
            <br />

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