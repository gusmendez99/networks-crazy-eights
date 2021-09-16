import React from 'react';

import styles from './index.module.scss';

export const Card = ({isVisible, suit, value}) => {
    return(
        <div>
            {
                isVisible && 
                <div className={styles.card}>{suit}{" "}{value}</div> 
            }
            {    !isVisible && suit && value &&  
                <div className={styles.stackCard}>{suit}{" "}{value}</div>  
            }
            {    !isVisible && !suit && !value &&
                <div className={styles.cardAdversary}>********</div> 
            }
           
        </div>
    );
};

export default Card;