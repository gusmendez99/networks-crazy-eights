import React from 'react';

import Hand from '../Hand';
import Deck from '../Deck';
import Heap from '../Heap';
import { getAvatar } from '../../utils';

import styles from './index.module.scss';

const GameTable = () => {
    
    const opponentsHands = [3, 5, 8];
    
    const myDeck = [{suit:"diamonds", value:"3"},
    {suit:"hearts", value:"3"},
    {suit:"spades", value:"3"},
    {suit:"hearts", value:"3"},
    {suit:"hearts", value:"3"},
    {suit:"hearts", value:"3"},
    {suit:"hearts", value:"3"},
    {suit:"hearts", value:"3"},
];

    return (
        <div className={styles.container}>
            <div className={styles.players}>
                {
                    opponentsHands.map((cardsInHand, index) => (
                        <div className={styles.playerHand}>
                            <Hand numOfCards={cardsInHand} key={index}/>
                            <div className={styles.listItem}>
                                <div>
                                    <img
                                        className={styles.playerImage}
                                        src={getAvatar(index)} 
                                        alt="player"
                                    />
                                </div>
                                <div className={styles.itemContent}>
                                    <span>{ 'Gustavo' }</span>
                                    <p> Player {index + 1} </p>
                                </div>
                                {
                                    /* mySocket.id === socketId && (
                                        <div className={styles.tagContainer}>
                                            <span className={styles.tag}>Me</span>
                                        </div>
                                    ) */
                                }
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
            <div className={styles.myCards}>
                <div className={styles.playerHand}>
                    <Hand cards={myDeck}/>
                    <div className={styles.listItem}>
                        <div>
                            <img
                                className={styles.playerImage}
                                src={getAvatar(3)} 
                                alt="player"
                            />
                        </div>
                        <div className={styles.itemContent}>
                            <span>{ 'Gus' }</span>
                            <p> Player {3 + 1} </p>
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
            </div> 
        </div>
    );
};

export default GameTable;