import React, { useEffect, useState } from "react";
import { useRoom } from "../../hooks/useRoom";
import { SocketEvents } from "../../settings";
import { findIndex } from "lodash";
import { Widget } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';
import styles from './index.module.scss';

export const Chat = () => {
    const {mySocket, room, players} = useRoom();
    const [ownPlayer, setOwnPlayer] = useState(undefined)

    useEffect(() => {
        const myPlayer = players && mySocket ? players[findIndex(players, ['socketId', mySocket.id])] : undefined;
        setOwnPlayer(myPlayer);
    }, [players, mySocket])

    const handleNewUserMessage = text => {
        const username = ownPlayer ? ownPlayer.username : 'Anon.';
        mySocket.emit(SocketEvents.SEND_MESSAGE, {roomId: room, from:username, message: text})
    }

    return(
        <div className = {styles.container}>
            <Widget
                handleNewUserMessage={handleNewUserMessage}
                title="Chat"
                subtitle={room && room.id ? `Room: ${room.id}` : ''}
            />
        </div>
    )
}