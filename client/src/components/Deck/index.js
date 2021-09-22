import React from 'react';

import Card from '../Card';
import { SocketEvents } from '../../settings';
import { useRoom } from '../../hooks/useRoom';

const Deck = () => {
    const {mySocket, room} = useRoom();

    const drawCard = () => {
        console.log("AWAIT WHILE WE GET YOU A CARD")
        mySocket.emit(SocketEvents.REQUEST_CARD_FROM_PILE, {roomId: room})
    }

    return(
        <div onClick ={() =>drawCard() }>
            <Card/>
        </div>
    );
}


export default Deck;