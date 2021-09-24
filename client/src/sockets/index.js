import io from 'socket.io-client';
import { HOST } from '../settings';

export const socket = io(HOST, {
    transports: ["websocket"],
    upgrade: false,
});