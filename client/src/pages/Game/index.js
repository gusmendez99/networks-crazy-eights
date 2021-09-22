import React, { useEffect } from 'react';

import GameTable from '../../components/GameTable';

import { useRoom } from '../../hooks/useRoom';
import { SocketEvents } from '../../settings';

const Game = () => {

    return (
        <div>
            <GameTable />
        </div>
    );
};

export default Game;