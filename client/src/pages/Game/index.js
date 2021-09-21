import React, { useEffect } from 'react';

import GameTable from '../../components/GameTable';

import { useRoom } from '../../hooks/useRoom';
import { SocketEvents } from '../../settings';

const Game = () => {
    const { mySocket, setMyCards} = useRoom();

    useEffect(() => {

        const handleCardReceived = ({card}) => {
            console.log("Hey")
            console.log(card)
            setMyCards(prevHand => [... prevHand, card]);
        }
    
        mySocket.on(SocketEvents.CARD_FROM_PILE, handleCardReceived);
        
        return () => {

        } 
    }, [mySocket])

    return (
        <div>
            <GameTable />
        </div>
    );
};

export default Game;