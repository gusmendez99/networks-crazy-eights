import React, { useEffect, useState } from 'react';

import Hand from '../Hand';
import Deck from '../Deck';
import Heap from '../Heap';
import Modal from '../../components/Modal';
import { Chat } from '../Chat';
import { getAvatar, arrayRotate } from '../../utils';

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
        currentPlayer,
        mainCard,
    } = useRoom();
    // Definition > opponentsHands = [{ cardsCount, player }, ...]
    const [opponentsHands, setOpponentsHands] = useState(undefined)
    const [myPlayer, setMyPlayer] = useState(undefined)
    const [isModalOpen, setIsModalOpen] = useState(false)

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
    }, [rivalsHands, players, mySocket, myHand, mainCard])

    const handleStackCards = (cards) => {
        console.log('Cards to stack: ', cards);

        mySocket.emit(SocketEvents.CARD_STACK, { 
            roomId: room,  
            cards,
        })

        const isMyTurn = players.indexOf(myPlayer) === currentPlayer

        if (myHand.length - cards.length <= 0 && isMyTurn) {
            // Congrats, you win!
            mySocket.emit(SocketEvents.GAME_FINISH, { 
                roomId: room,
            })
            return;
        }

        if (cards && cards[0].value === "8") {
            setIsModalOpen(true);
        } else {
            mySocket.emit(SocketEvents.TURN_CHANGE, { roomId: room })
        }

    }

    const handleChangeSuit = (suit) => {
        mySocket.emit(SocketEvents.SUIT_CHANGE, { roomId: room, suit });
        mySocket.emit(SocketEvents.TURN_CHANGE, { roomId: room });
        setIsModalOpen(false);

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
                                        className={players.indexOf(player) === currentPlayer ? styles.playerImageActive : styles.playerImage}
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
                    <Heap card={mainCard}/>
                </div>
            </div>
            {myPlayer && (<div className={styles.myCards}>
                <div className={styles.playerHand}>
                    <Hand onCardSelected={handleStackCards} cards={myHand}/>
                    <div className={styles.listItem}>
                        <div>
                            <img
                                className={players.indexOf(myPlayer) === currentPlayer ? styles.playerImageActive : styles.playerImage}
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
            <Chat />
            <Modal show={isModalOpen}>
                <button onClick={() => handleChangeSuit("spades")}>♠</button>
                <button onClick={() => handleChangeSuit("hearts")}>♥</button>
                <button onClick={() => handleChangeSuit("diamonds")}>♦</button>
                <button onClick={() => handleChangeSuit("clubs")}>♣</button>
            </Modal>
        </div>
    );
};

export default GameTable;