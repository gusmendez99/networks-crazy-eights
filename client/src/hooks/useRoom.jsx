import React, { createContext, useContext, useState } from 'react';
import { socket } from '../sockets';

const RoomContext = createContext({ });

export const RoomProvider = (props) => {
    const [mySocket, setMySocket] = useState(socket);
    const [room, setRoom] = useState(undefined);
    const [isOwner, setIsOwner] = useState(false);
    const [players, setPlayers] = useState([]);
    const [myHand, updateMyHand] = useState(undefined);
    const [rivalsHands, updateRivalsHand] = useState([]);
    const [mainCard, setMainCard] = useState(undefined);
    const [turn, setTurn] = useState(undefined);
    const [currentSuit, setCurrentSuit] = useState(undefined);
    const [winner, setWinner] = useState(undefined);
    const [chat, setChat] = useState([]);

    return (
        <RoomContext.Provider 
            value={{
                mySocket,
                setMySocket,
                players,
                setPlayers,
                room,
                setRoom,
                isOwner,
                setIsOwner,
                myHand,
                updateMyHand,
                rivalsHands,
                updateRivalsHand,
                mainCard,
                setMainCard,
                turn,
                setTurn,
                currentSuit,
                setCurrentSuit,
                chat,
                setChat,
                winner,
                setWinner
            }}
        >
            { props.children }
        </RoomContext.Provider>
    )
}

export function useRoom() {
    const context = useContext(RoomContext);
    if (context === undefined) throw new Error('useRoom must be used within a RoomProvider');
    return context;
}