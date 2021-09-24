import boy from '../assets/img/avatars/boy.png';
import clown from '../assets/img/avatars/clown.png';
import death from '../assets/img/avatars/death.png';
import nun from '../assets/img/avatars/nun.png';

export const AVATARS = [
    boy,
    clown,
    death,
    nun,
]

export const getAvatar = idx => {
    if (idx === -1) return AVATARS[0];
    return idx < AVATARS.length ? AVATARS[idx] : AVATARS[0];
}

export const importFolderImages = r => {
    // Import all images in image folder
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

export const arrayRotate = (arr, count) => {
    count -= arr.length * Math.floor(count / arr.length);
    arr.push.apply(arr, arr.splice(0, count));
    return arr;
}

export const getSuggestedMoveIndexes = (playedCard, handCards) => {
    /*
    Checks if there is a multi-card move on a player hand
    Returns the amount of cards with the same value as the one being played and the indexes of said cards
    */ 
    const cardIndexes = []
    // Check if there is another card in hand with the same value
    handCards.forEach((card, idx) => {
        if (card.value === playedCard.value && idx !== handCards.indexOf(playedCard)) {
            // If there is add its index to the array of found cards
            cardIndexes.push(idx);
        }
    })
    return cardIndexes
}

export const getSuggestedValidMoveIndexes = (handCards, currentStackCard) => {
    /*
    Checks if there is a valid card to stack, based on current stack card.
    Returns the indexes of said cards
    */ 
    const cardIndexes = []
    handCards.forEach((card, idx) => {
        if (currentStackCard.value === card.value || currentStackCard.suit === card.suit) {
            // If there is add its index to the array of found cards
            cardIndexes.push(idx);
        }
    })
    return cardIndexes;
}