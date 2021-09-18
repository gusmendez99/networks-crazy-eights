import cors from 'cors';
import { SocketEvents, PORT } from './settings.js';
import { app, server, io } from './sockets/index.js';
import * as roomSockets from './sockets/rooms.js';

app.use(cors({origin: null}))

io.on(SocketEvents.CONNECT, (socket) => {
    console.log('Connected')

    // Room events
    socket.on(SocketEvents.ROOM_CREATE_OR_JOIN, (data) => roomSockets.createOrJoinRoom(socket, data));
    socket.on(SocketEvents.ROOM_LEAVE, (data) => roomSockets.leaveRoom(socket, data));
    socket.on(SocketEvents.SEND_MESSAGE, (data) => roomSockets.sendChat(socket, data))
});

server.listen(PORT, () => {
    console.log("Listening in", PORT)
})
