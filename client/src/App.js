import iocli from 'socket.io-client'


import React, {Component} from 'react';
import { HOST } from './settings';

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
            <div style={{backgroundColor: this.state.color}}>
                <button onClick={() => this.send('red')}>Red</button>
                <button onClick={() => this.send('green')}>Green</button>
                <button onClick={() => this.send('blue')}>Blue</button>
            </div>
        );
    }
}

App.propTypes = {};

export default App;