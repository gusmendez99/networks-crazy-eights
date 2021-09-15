import React, { useEffect } from 'react';
import { socket } from './sockets';
import { useRoom } from './hooks/useRoom';
import { Home } from './pages/home';

import styles from './App.scss';

const App = () => {
    const { setMySocket } = useRoom();

    useEffect(() => {
       setMySocket && setMySocket(socket);
       return () => socket.close(); 
    }, [setMySocket])

    return (
        <div className={styles.App}>
            <Home />
        </div>
    )
};

export default App;