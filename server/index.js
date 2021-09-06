import cors from 'cors';
import { SocketEvents, PORT } from './settings.js';
import { app, server, io } from './sockets/index.js';
import * as userSockets from './sockets/users.js';

app.use(cors({origin: null}))

io.on(SocketEvents.CONNECT, (socket) => {
    console.log('Connected')

    // Room events
    socket.on(SocketEvents.ROOM_JOIN, (data) => userSockets.joinRoom(socket, data));
    socket.on(SocketEvents.ROOM_LEAVE, () => userSockets.leaveRoom(socket));
});

server.listen(PORT, () => {
    console.log("Listening in", PORT)
})
