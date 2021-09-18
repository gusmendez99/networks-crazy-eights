import boy from '../assets/img/avatars/boy.png';
import clown from '../assets/img/avatars/clown.png';
import death from '../assets/img/avatars/death.png';
import nun from '../assets/img/avatars/nun.png';
import catwoman from '../assets/img/avatars/catwoman.png';
import thief from '../assets/img/avatars/thief.png';
import vampire from '../assets/img/avatars/vampire.png';

export const AVATARS = [
    boy,
    clown,
    death,
    nun,
    catwoman,
    thief,
    vampire,
]

export const getAvatar = idx => {
    return idx < AVATARS.length ? AVATARS[idx] : AVATARS[0];
}

export const importFolderImages = r => {
    // Import all images in image folder
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}