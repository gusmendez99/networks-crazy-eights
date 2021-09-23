import React from 'react';

import Card from '../Card';

const Heap = ({
    card
}) => {
    return(
        <div>
            <Card 
                suit={card ? card.suit : "hearts"} 
                value={card ? card.value : "A"}
            />
        </div>
    );
}


export default Heap;