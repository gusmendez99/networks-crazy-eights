import React from 'react';
import range from 'lodash/range';
import { MAX_DISPLAYING_HAND_CARDS } from '../../settings';

import Card from '../Card';

import styles from './index.module.scss';

export const Hand = ({ cards, numOfCards, onCardSelected }) => {

    const displayedCount = numOfCards && numOfCards >= MAX_DISPLAYING_HAND_CARDS 
        ? MAX_DISPLAYING_HAND_CARDS
        : numOfCards;
    
    const nonDisplayedCount = numOfCards && numOfCards - displayedCount;

    return(
        <div className={styles.hand}>
            {  
                // If there is a list of cards for a player then numOfCards should be available
                cards && 
                cards.map((card, index) => (
                    <div
                        key={index}
                        className={styles.cardsContainer}
                        onClick={() => onCardSelected(card)}
                    >
                        <Card
                            isVisible
                            suit={card.suit}
                            value={card.value}
                        />
                    </div>
                ))
            }
            {
                numOfCards && (
                    <div className={styles.cardsContainer}>
                        {
                            range(displayedCount).map((index) => (
                                <Card key={index}/>
                            ))
                        }
                        {
                            nonDisplayedCount && nonDisplayedCount > 0 && (
                                <span className={styles.cardQty}>{ `+${nonDisplayedCount}` }</span>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Hand;