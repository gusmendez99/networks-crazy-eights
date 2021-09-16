import React from 'react';
import range from 'lodash/range';

import Card from '../Card';

import styles from './index.module.scss';

export const Hand = ({cards, numOfCards}) => {
    return(
        <div className={styles.hand}>
            {  
                cards && //if there is a list of cards for a player then numOfCards should be available
                cards.map((card, index) => (
                    <Card isVisible={true} suit={card.suit} value={card.value} key={index}/>
                ))
            }
            {
                numOfCards && (
                range(numOfCards).map((index) => (
                    <Card isVisible={false} key={index}/>
                ))
                )
            }
        </div>
    );
};

export default Hand;