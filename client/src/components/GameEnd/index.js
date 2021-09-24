import React from 'react';
import { useRoom } from '../../hooks/useRoom';
import { getAvatar } from '../../utils';
import { Chat } from '../Chat';
import { v4 as uuidv4 } from 'uuid';

import styles from './gameEnd.module.scss';

export const GameEnd = () => {
    const { 
        mySocket,
        winner,
        players,
        // setters to reset
        setRoom,
        setIsOwner,
        setPlayers,
        updateMyHand,
        updateRivalsHands,
        setMainCard,
        setTurn,
        setCurrentPlayer,
        setCurrentSuit,
        setWinner,
        setChat,
    } = useRoom();

    const resetGame = () => {
        // TODO: Reset useRoom hook props here!
        console.log('Reset game!')
        setRoom(undefined);
        setIsOwner(false);
        setPlayers([]);
        updateMyHand(undefined);
        updateRivalsHands([]);
        setMainCard(undefined);
        setTurn(undefined);
        setCurrentPlayer(0);
        setCurrentSuit(undefined);
        setWinner(undefined);
        setChat([])
    }

    const getWinnerInfo = () => {
        const player = players.find(player => player.socketId === winner.socketId);
        if (player) {
            const index = players.indexOf(player)
            return {
                player,
                index,
            }
        }
        return undefined
    }

    return (
        <div className={styles.container}>
            <div className={styles.gameEnd}>
                <h1>Game Ended</h1>
                <div className={styles.actions}>
                    <button className={styles.btn} onClick={() => resetGame()}> Play again </button>
                </div>
                { 
                    winner && 
                    (
                        <div className={styles.players}>
                            <h3> Winner </h3>
                            <div className={styles.listWrapper}>
                                <ul className={styles.list}>
                                    <li key={uuidv4()} className={styles.listItem}>
                                        <div>
                                            <img
                                                className={styles.playerImage}
                                                src={getAvatar(getWinnerInfo().index)} 
                                                alt="player"
                                            />
                                        </div>
                                        <div className={styles.itemContent}>
                                            <span>{ winner.username }</span>
                                            <p> Player {getWinnerInfo().index + 1} </p>
                                        </div>
                                        {
                                            mySocket.id === winner.socketId && (
                                            <div className={styles.tagContainer}>
                                                <span className={styles.tag}>Me</span>
                                            </div>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
                }
                <Chat/>
            </div>
        </div>
    );
}

export default GameEnd;