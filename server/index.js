import cors from 'cors';
import { SocketEvents, PORT } from './settings.js';
import { app, server, io } from './sockets/index.js';
import * as roomSockets from './sockets/rooms.js';
import * as gameSockets from './sockets/game.js';

app.use(cors({origin: null}))

io.on(SocketEvents.CONNECT, (socket) => {
    console.log('Connected socket: ', socket.id);

    // Room events
    socket.on(SocketEvents.ROOM_CREATE_OR_JOIN, (data) => roomSockets.createOrJoinRoom(socket, data));
    socket.on(SocketEvents.ROOM_LEAVE, (data) => roomSockets.leaveRoom(socket, data));
    socket.on(SocketEvents.SEND_MESSAGE, (data) => roomSockets.sendChat(socket, data));

    //Game events
    socket.on(SocketEvents.REQUEST_CARD_FROM_PILE, (data)=> gameSockets.drawCard(socket, data));
    // Game events
    socket.on(SocketEvents.GAME_START, (data) => gameSockets.startGame(socket, data));
});

server.listen(PORT, () => {
    console.log("Listening in", PORT)
})
