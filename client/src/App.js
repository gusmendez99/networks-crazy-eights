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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
            <ToastContainer hideProgressBar={true}/>
        </div>
    );
}

export default App;