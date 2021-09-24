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
    const [cardsToStackIndexes, setCardsToStackIndexes] = useState([]);

    useEffect(() => {
        const suggestedValidCardsIndexes = (mainCard && cards && cards.length > 0 && getSuggestedValidMoveIndexes(cards, mainCard)) || []
        setValidCardsIndexes(suggestedValidCardsIndexes);
    }, [mainCard, cards])
    
    const displayedCount = numOfCards && numOfCards >= MAX_DISPLAYING_HAND_CARDS 
        ? MAX_DISPLAYING_HAND_CARDS
        : numOfCards;
    
    const nonDisplayedCount = numOfCards && numOfCards - displayedCount;

    const checkForMoreCards = (card) => {
        const suggestedMoveCardsIdxs = getSuggestedMoveIndexes(card, cards) || []
        setSuggestedCardsIndexes(suggestedMoveCardsIdxs)
    }

    const clearSuggestions = () => setSuggestedCardsIndexes([]);
    
    const handleSelectedCard = (cardIndex) => {

        const selectedCard = cards[cardIndex];
        const suggestedMoveCardsIdxs = getSuggestedMoveIndexes(selectedCard, cards) || []

        /* 
            Case 1: card selected has suggested cards (at least one)
                    So, we want to append more cards in one move
        */
        if (suggestedMoveCardsIdxs.length > 0 ) {
            
            // Case A: Card exists in cardsToStack array, so we want to remove it.
            if (cardsToStackIndexes.includes(cardIndex)) {
                setCardsToStackIndexes([...cardsToStackIndexes.filter(cardToStackIdx => cardToStackIdx !== cardIndex)]);
            } else {
                // Case B: First time player selects the card, so add it to cardsToStack array
                setCardsToStackIndexes([...cardsToStackIndexes, cardIndex]);
            }
            
        } else {
            /* 
                Case 2: we only have one stackable card selected, and has no more suggested cards
                        So, we just send it throught our socket
            */
            
            const uniqueStackableCard = cards[cardIndex];
            onCardSelected([uniqueStackableCard])
        }

    }

    return(
        <div className={styles.hand}>
            {  
                // If there is a list of cards for a player then numOfCards should be available
                cards && 
                cards.map((card, index) => {
                    // Card validations
                    const isValid = validCardsIndexes.includes(index);
                    const isSuggested = suggestedCardsIndexes.includes(index);
                    const isSelected = cardsToStackIndexes.includes(index);

                    return (
                        <div 
                            key={index}
                            className={styles.cardsContainer}
                            onMouseEnter={() => {
                                if (!isValid) return;
                                checkForMoreCards(card)
                            }}
                            onMouseLeave={() => clearSuggestions()}
                            onClick={() => {
                                if (!isValid) return;
                                handleSelectedCard(index);
                            }}
                            // onClick={() => onCardSelected(card)}
                        >
                            <Card 
                                isVisible
                                isStackable={isValid}
                                isSuggested={isSuggested}
                                isSelected={isSelected}
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