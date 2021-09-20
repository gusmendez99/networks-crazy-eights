import React from 'react';
import { importFolderImages } from '../../utils';

import styles from './index.module.scss';

const BACK_CARD = 'back.png'

export const Card = ({
    isVisible = false,
    suit,
    value
}) => {
    const cardImages = importFolderImages(require.context('../../assets/img/cards', false, /\.(png|jpe?g|svg)$/));
    const suitKey = suit && suit.charAt(0) ? suit.charAt(0).toUpperCase() : undefined;
    const cardKey = !suitKey ? BACK_CARD : `${suitKey}${value}.png`;


    return(
        <div >
            {
                isVisible && 
                <div className={styles.card}>
                    <img alt="card" src={cardImages[cardKey].default} />
                </div> 
            }
            {    !isVisible && suit && value &&  
                <div className={styles.stackCard}>
                    <img alt="card" src={cardImages[cardKey].default} />
                </div>  
            }
            {    !isVisible && !suit && !value &&
                <div className={styles.cardAdversary}>
                    <img alt="card" src={cardImages[cardKey].default} />
                </div> 
            }
           
        </div>
    );
};

export default Card;