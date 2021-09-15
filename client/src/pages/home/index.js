import React, { useEffect } from 'react';

import { Registration } from '../../components/Registration';
import { WaitingRoom } from '../../components/WaitingRoom';
import { RoomForm } from '../../components/RoomForm';

import "./index.module.scss";
import { useRoom } from '../../hooks/useRoom';
import { SocketEvents } from '../../settings';

export const Home = () => {
    const { mySocket, room, setRoom, setPlayers, setIsOwner } = useRoom();

    useEffect(() => {
        const handleMessage = (message) => console.log(message);
        const handleRoomCreated = ({ roomId }) => setRoom(roomId);
        const handleGamePlayersInfo = ({ roomId, players, ownerId }) => {
            console.log(players, roomId, ownerId)
            setPlayers(players);
            setIsOwner(ownerId === mySocket.id);
            setRoom(roomId);
        };

        mySocket.on(SocketEvents.ROOM_CREATED, handleRoomCreated);
        mySocket.on(SocketEvents.MESSAGE, handleMessage);
        mySocket.on(SocketEvents.ROOM_PLAYERS, handleGamePlayersInfo);
        
        return () => {
            mySocket.off(SocketEvents.ROOM_CREATED, handleRoomCreated);
            mySocket.off(SocketEvents.MESSAGE, handleMessage);
            mySocket.off(SocketEvents.ROOM_PLAYERS, handleGamePlayersInfo);
        } 
    }, [mySocket])

    return (
        <div className="container">
            {
                room ? (
                    <WaitingRoom />
                ) : (
                    <>
                        <Registration />
                        <RoomForm />
                    </>       
                )
            }
        </div>
    )
};

export default Home;