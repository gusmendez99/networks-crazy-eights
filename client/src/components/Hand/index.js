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
        if (suggestedMoveCardsIdxs.length > 0 && cardsToStackIndexes.length > 0) {
            // If its a different suit, it means that we are clearing the cards to stack
            const storedCard = cards[cardsToStackIndexes[0]]
            if (storedCard && storedCard.value !== selectedCard.value) {
                // Reset cardsToStackIndexes
                // console.log('Selected cards with different suit, must reset cardsToStack: ', storedCard, selectedCard)
                setCardsToStackIndexes([cardIndex]);
                return;
            } else {
                // Case A: Card exists in cardsToStack array, so we want to remove it.
                if (cardsToStackIndexes.includes(cardIndex)) {
                    // console.log('Removing previous selected card: ', selectedCard)
                    setCardsToStackIndexes([...cardsToStackIndexes.filter(cardToStackIdx => cardToStackIdx !== cardIndex)]);
                    return;
                }
                // Case B: First time player selects the card, so add it to cardsToStack array
                // Check if all suggestions & current card exists in cardsToStackIndexes
                const finalCardsToStackIdxs = [...cardsToStackIndexes, cardIndex]
                const isReadyToStackAll = [...suggestedMoveCardsIdxs, cardIndex].every(idx => finalCardsToStackIdxs.includes(idx));
                if (isReadyToStackAll) {
                    // console.log('Stacking cards: ', finalCardsToStack.map(idx => cards[idx]))
                    onCardSelected(finalCardsToStackIdxs.map(idx => cards[idx]))
                    setCardsToStackIndexes([])
                    return;
                }
                // console.log('Not ready yet: ', cardsToStackIndexes)
                setCardsToStackIndexes([...cardsToStackIndexes, cardIndex]);
            }
        } else if (suggestedMoveCardsIdxs.length > 0) {
            // console.log('Cards to stack is empty, so we need to save the first item: ', selectedCard)
            setCardsToStackIndexes([...cardsToStackIndexes, cardIndex]);
        } else {
            /* 
                Case 2: we only have one stackable card selected, and has no more suggested cards
                        So, we just send it throught our socket
            */
            //console.log('Stacking card: ', uniqueStackableCard)
            const singleStackableCard = cards[cardIndex];
            setCardsToStackIndexes([])
            onCardSelected([singleStackableCard])
        }

    }

    return(
        <div className={styles.hand}>
            {  
                // If there is a list of cards for a player then numOfCards should be available
                cards && 
                cards.map((card, index) => {
                    // Card validations
                    const isValid = validCardsIndexes.includes(index) || 
                        cardsToStackIndexes
                            .map(idx => cards[idx])
                            .some(cardToStack => cardToStack && cardToStack.value === card.value);
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