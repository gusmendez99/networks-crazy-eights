import iocli from 'socket.io-client'


import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
import { HOST } from './settings';

import { Home } from './pages/home';
import Game from './pages/Game';

import styles from './App.scss';

class App extends Component {
    state = {
        host: HOST,
        color: 'white'
    }

    componentDidMount() {
        this.socket = iocli(this.state.host, {transports: ['websocket']})

        this.socket.emit('connection', 'yo')
        this.socket.on('color', (color) => {
            this.setState({color})
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    send = (color) => {
        this.socket.emit('set_color', color)
    }

    render() {
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
}

App.propTypes = {};

export default App;