import React, { useEffect } from 'react';

import { Registration } from '../../components/Registration';
import { WaitingRoom } from '../../components/WaitingRoom';
import { RoomForm } from '../../components/RoomForm';
import { Nav } from '../../components/Nav';
import { addResponseMessage } from 'react-chat-widget';

import { useRoom } from '../../hooks/useRoom';
import { SocketEvents } from '../../settings';

export const Home = () => {
    const { mySocket, room, setRoom, setPlayers, setIsOwner, chat, setChat } = useRoom();

    useEffect(() => {
        // TODO: place this functions inside /sockets folder
        const handleDisconnect = () => {
            // Reinitialize hook values
            setRoom(undefined);
            setPlayers([]);
            setIsOwner(false);
        }
        const handleMessage = (message) => console.log(message);
        const handleRoomCreated = ({ roomId }) => setRoom(roomId);
        const handleRoomLeft = ({ roomId, username }) => {
            handleDisconnect();
        };
        const handleGamePlayersInfo = ({ roomId, players, ownerId }) => {
            console.log(players, roomId, ownerId)
            setPlayers(players);
            setIsOwner(ownerId === mySocket.id);
            setRoom(roomId);
        };

        const handleMessageReceived = ({ id, message, from, createdAt }) => {
            const newMessage = { message, from, createdAt}
            setChat(prevChat => [...prevChat, newMessage]);
            addResponseMessage(`${from}: ${message}`, id);
        };

        mySocket.on(SocketEvents.DISCONNECT, handleDisconnect);
        mySocket.on(SocketEvents.ROOM_CREATED, handleRoomCreated);
        mySocket.on(SocketEvents.MESSAGE, handleMessage);
        mySocket.on(SocketEvents.ROOM_PLAYERS, handleGamePlayersInfo);
        mySocket.on(SocketEvents.ROOM_LEFT, handleRoomLeft);
        mySocket.on(SocketEvents.MESSAGE_SENT, handleMessageReceived);
        
        return () => {
            mySocket.off(SocketEvents.DISCONNECT, handleDisconnect);
            mySocket.off(SocketEvents.ROOM_CREATED, handleRoomCreated);
            mySocket.off(SocketEvents.MESSAGE, handleMessage);
            mySocket.off(SocketEvents.ROOM_PLAYERS, handleGamePlayersInfo);
            mySocket.off(SocketEvents.ROOM_LEFT, handleRoomLeft);
            mySocket.off(SocketEvents.MESSAGE_SENT, handleMessageReceived);
        } 
    }, [mySocket])

    return (
        <div className="container">
            <Nav />
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