import io from 'socket.io-client';
import { HOST, TIMEOUT } from '../settings';

export const socket = io(HOST, {
    timeout: TIMEOUT,                  
    transports: ["websocket"],
});