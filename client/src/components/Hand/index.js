import React, { useState } from 'react';
import range from 'lodash/range';
import { MAX_DISPLAYING_HAND_CARDS } from '../../settings';

import Card from '../Card';

import styles from './index.module.scss';
import { suggestMove } from '../../utils';
import { useRoom } from '../../hooks/useRoom';

export const Hand = ({cards, numOfCards}) => {
    const [suggestedCards, setSuggestedCards] = useState([]);
    
    const displayedCount = numOfCards && numOfCards >= MAX_DISPLAYING_HAND_CARDS 
        ? MAX_DISPLAYING_HAND_CARDS
        : numOfCards;
    
    const nonDisplayedCount = numOfCards && numOfCards - displayedCount;

    const checkForMoreCards = (card, handDeck) => {
        console.log("Trying to suggest moves")
        const suggestedMoveCards = suggestMove(card, handDeck, {value:"A", suit:"hearts" })[1]
        setSuggestedCards(suggestedMoveCards)
        console.log("Suggested Move:", suggestedCards)
    }
    return(
        <div className={styles.hand}>
            {  
                cards && //if there is a list of cards for a player then numOfCards should be available
                cards.map((card, index) => (
                    <div className={styles.cardsContainer} onClick={()=> checkForMoreCards(card, cards)}>
                        <Card 
                            key={index}
                            isVisible
                            suit={card.suit}
                            value={card.value}
                            suggested={suggestedCards.includes(index)}
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