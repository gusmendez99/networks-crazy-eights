import React, { useEffect } from 'react';
import { socket } from './sockets';
import { useRoom } from './hooks/useRoom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Home } from './pages/home';
import Game from './pages/Game';

import styles from './App.scss';


const App = () => {
    const { setMySocket } = useRoom();

    useEffect(() => {
        setMySocket && setMySocket(socket);
        return () => socket.close(); 
    }, [setMySocket])

    return (
        <div className={styles.App}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/game" component={Game}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;