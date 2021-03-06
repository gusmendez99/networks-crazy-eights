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
    socket.on(SocketEvents.CARD_STACK, (data)=> gameSockets.stackCards(socket, data));
    socket.on(SocketEvents.GAME_START, (data) => gameSockets.startGame(socket, data));
    socket.on(SocketEvents.GAME_FINISH, (data) => gameSockets.finishGame(socket, data));
    socket.on(SocketEvents.TURN_PASS, (data) => gameSockets.passTurn(socket, data));
    socket.on(SocketEvents.TURN_CHANGE, (data) => gameSockets.changeTurn(socket, data));
    socket.on(SocketEvents.SUIT_CHANGE, (data) => gameSockets.changeSuit(socket, data));
    
});

server.listen(PORT, () => {
    console.log("Listening in", PORT)
})

