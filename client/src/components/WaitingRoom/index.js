import React from 'react';
import { useRoom } from '../../hooks/useRoom';
import { SocketEvents } from '../../settings';
import { getAvatar } from '../../utils';
import { Chat } from '../Chat';

import styles from './waitingRoom.module.scss';

export const WaitingRoom = () => {
    const { mySocket, room, isOwner, players } = useRoom();

    const leaveRoom = () => {
        mySocket.emit(SocketEvents.ROOM_LEAVE, { roomId: room })
    }

    return(
        <div className={styles.container}>
            <div className={styles.waitingRoom}>
                <h1>Waiting Room</h1>
                <span>Room ID: {room}</span>
                <div className={styles.actions}>
                    {
                        isOwner && (
                            <button className={styles.btn} onClick={() => console.log("Game start")}> Start Game </button>
                        )
                    }
                    <button className={styles.btn} onClick={() => leaveRoom()}> Leave room </button>
                </div>
                <div className={styles.players}>
                    <h3> Players </h3>
                    <div className={styles.listWrapper}>
                        <ul className={styles.list}>
                        {
                            players.map(({ socketId, username }, idx) => (
                                <li key={socketId} className={styles.listItem}>
                                    <div>
                                        <img
                                            className={styles.playerImage}
                                            src={getAvatar(idx)} 
                                            alt="player"
                                        />
                                    </div>
                                    <div className={styles.itemContent}>
                                        <span>{ username }</span>
                                        <p> Player {idx + 1} </p>
                                    </div>
                                    {
                                        mySocket.id === socketId && (
                                        <div className={styles.tagContainer}>
                                            <span className={styles.tag}>Me</span>
                                        </div>
                                    )}
                                </li>
                            ))
                        }
                        </ul>
                    </div>
                </div>
                <Chat/>
            </div>
        </div>
    );
}

export default WaitingRoom;