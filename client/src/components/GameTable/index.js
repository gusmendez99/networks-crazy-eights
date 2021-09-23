import React, { useEffect, useState } from 'react';

import Hand from '../Hand';
import Deck from '../Deck';
import Heap from '../Heap';
import { getAvatar, arrayRotate } from '../../utils';
import { v4 as uuidv4 } from 'uuid';

import styles from './index.module.scss';
import { useRoom } from '../../hooks/useRoom';
import { SocketEvents } from '../../settings';

const GameTable = () => {
    const {
        room,
        myHand,
        rivalsHands,
        players,
        mySocket,
    } = useRoom();
    // Definition > opponentsHands = [{ cardsCount, player }, ...]
    const [opponentsHands, setOpponentsHands] = useState(undefined)
    const [myPlayer, setMyPlayer] = useState(undefined)

    useEffect(() => {
        const myPlayerIdx = players.findIndex(player => player.socketId === mySocket.id);
        if (myPlayerIdx !== -1) {
            const myPlayer = players[myPlayerIdx];
            const originalPlayers = [...players];
            const rotatedPlayers = arrayRotate(originalPlayers, myPlayerIdx);

            // console.log('Rotated: ', rotatedPlayers, rivalsHands)
            const orderedCardCounts = (rotatedPlayers && rotatedPlayers.slice(1, rotatedPlayers.length).map(player => {
                const orderedIdx = rivalsHands.findIndex(hand => hand.player === player.username);
                if (orderedIdx !== -1) {
                    const cardsCount = rivalsHands[orderedIdx] ? rivalsHands[orderedIdx].value : 0;
                    return {
                        player,
                        cardsCount
                    }
                }
            }).filter(val => val !== undefined)) || undefined
            // console.log('Ordered: ', orderedCardCounts)
            setOpponentsHands(orderedCardCounts)
            setMyPlayer(myPlayer);
        }
    }, [rivalsHands, players, mySocket, myHand])

    // TODO: Add multiple card support here... 
    const handleStackCards = (card) => {
        console.log('Card to stack: ', card);
        mySocket.emit(SocketEvents.CARD_STACK, { 
            roomId: room,  
            cards: [card],
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.players}>
                {
                    opponentsHands && opponentsHands.map(({ cardsCount, player }, index) => (
                        <div className={styles.playerHand}>
                            <Hand numOfCards={cardsCount} key={index}/>
                            <div className={styles.listItem}>
                                <div>
                                    <img
                                        className={styles.playerImage}
                                        src={getAvatar(players.indexOf(player))} 
                                        alt="player"
                                    />
                                </div>
                                <div className={styles.itemContent}>
                                    <span>{ player.username }</span>
                                    <p> Player {players.indexOf(player) + 1} </p>
                                </div>
                            </div>
                        </div>
                    ))
                }    
            </div> 
            <div className={styles.deck}>
                <div className={styles.deck}>
                    <Deck />
                    <Heap />
                </div>
            </div>
            {myPlayer && (<div className={styles.myCards}>
                <div className={styles.playerHand}>
                    <Hand onCardSelected={handleStackCards} cards={myHand}/>
                    <div className={styles.listItem}>
                        <div>
                            <img
                                className={styles.playerImage}
                                src={getAvatar(players.indexOf(myPlayer))} 
                                alt="player"
                            />
                        </div>
                        <div className={styles.itemContent}>
                            <span>{ myPlayer.username }</span>
                            <p> Player {players.indexOf(myPlayer) + 1} </p>
                        </div>
                        {
                            true && (
                                <div className={styles.tagContainer}>
                                    <span className={styles.tag}>Me</span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>)} 
        </div>
    );
};

export default GameTable;