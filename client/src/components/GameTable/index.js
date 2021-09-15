import React from 'react';

import Hand from '../Hand';
import Deck from '../Deck';
import Heap from '../Heap';

import styles from './index.module.scss';

const GameTable = () => {
    
    const cardsInHads = [1,4,8];
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
                    cardsInHads.map((cardsInHand, index) => (
                        <Hand numOfCards={cardsInHand} key={index}/>
                    ))
                }    
            </div> 
            <div className={styles.deck}>
                { 
                <div className={styles.deck}>
                    <Deck />
                    <Heap />
                </div>

                }            </div> 
            <div className={styles.myCards}>
                {
                    <Hand cards={myDeck}/>
                }
            </div> 
        </div>
    );
};

export default GameTable;