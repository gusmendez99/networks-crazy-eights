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

export const suggestMove = (playedCard, handDeck, currentStackCard) => {
    /*
    Checks if there is a multi-card move on a player hand
    Returns the amount of cards with the same value as the one being played and the indexes of said cards
    */ 
    const indexes_of_cards = []
    //check if there is another card in hand with the same value
    for(let i= 0; i < handDeck.length; i ++){
        if (handDeck[i].value === playedCard.value && i !== handDeck.indexOf(playedCard)) {
            //if there is add its index to the array of found cards
            indexes_of_cards.push(i)
        }
    }
    return [indexes_of_cards.length, indexes_of_cards]
}