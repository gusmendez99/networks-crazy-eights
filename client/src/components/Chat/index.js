import React, {useState, useEffect} from "react";
import { useRoom } from "../../hooks/useRoom";
import { SocketEvents } from "../../settings";
import { concat, findIndex } from "lodash";


import styles from './index.module.scss';

export const Chat = () => {
    const {mySocket, room, chat, setChat, players} = useRoom();
    const [message, setMessage] = useState("")

    const sendChat = (text) => {
        const username = players[findIndex(players, ['socketId', mySocket.id])].username
        mySocket.emit(SocketEvents.SEND_MESSAGE, {roomId: room, from:username, message: text})
        setMessage('')
    }
    return(
        <div className = {styles.container}>
            <div className = {styles.chat}>Chat</div>
            <div>
                {chat.map(item => (
                    <div key = {item.createdAt} >{`${item.from}: ${item.message}`}</div>
                ))}
            </div>
            <input
                placeholder = "Say something..."
                type="text"
                value = {message}
                onChange = {e => setMessage(e.target.value)}
             />
            <button onClick = {()=>sendChat(message)}>Send</button>
        </div>
    )
}