import React, { useEffect, useState } from 'react';
import range from 'lodash/range';
import { MAX_DISPLAYING_HAND_CARDS } from '../../settings';

import Card from '../Card';
import { getSuggestedMoveIndexes, getSuggestedValidMoveIndexes } from '../../utils';
import { useRoom } from '../../hooks/useRoom';

import styles from './index.module.scss';

export const Hand = ({cards, numOfCards, onCardSelected}) => {
    const { mainCard } = useRoom();
    const [suggestedCardsIndexes, setSuggestedCardsIndexes] = useState([]);
    const [validCardsIndexes, setValidCardsIndexes] = useState([]);

    useEffect(() => {
        const suggestedValidCardsIndexes = (mainCard && cards && cards.length > 0 && getSuggestedValidMoveIndexes(cards, mainCard)) || []
        setValidCardsIndexes(suggestedValidCardsIndexes);
    }, [mainCard, cards])
    
    const displayedCount = numOfCards && numOfCards >= MAX_DISPLAYING_HAND_CARDS 
        ? MAX_DISPLAYING_HAND_CARDS
        : numOfCards;
    
    const nonDisplayedCount = numOfCards && numOfCards - displayedCount;

    const checkForMoreCards = (card, handCards) => {
        // console.log("Trying to suggest moves")
        const suggestedMoveCards = (mainCard && getSuggestedMoveIndexes(card, handCards)) || []
        setSuggestedCardsIndexes(suggestedMoveCards)
        console.log("Suggested Move:", suggestedCardsIndexes)
    }

    return(
        <div className={styles.hand}>
            {  
                // If there is a list of cards for a player then numOfCards should be available
                cards && 
                cards.map((card, index) => {
                    const isValid = validCardsIndexes.includes(index)
                    const isSuggested = suggestedCardsIndexes.includes(index)
                    return (
                        <div 
                            key={index}
                            className={styles.cardsContainer}
                            onClick={() => {
                                if (!isValid) return;
                                checkForMoreCards(card, cards)
                            }}
                            // onClick={() => onCardSelected(card)}
                        >
                            <Card 
                                isVisible
                                isStackable={isValid}
                                isSuggested={isSuggested}
                                suit={card.suit}
                                value={card.value}
                            />
                        </div>
                    )
                })
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