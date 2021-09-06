import {
    getRoomUsers,
    userJoin,
    userLeave,
} from '../models/users.js';
import { io } from './index.js';
import { SocketEvents, SERVER_NAME, MAX_PLAYERS } from '../settings.js';
import { makeMessage } from '../utils/index.js';

export const joinRoom = (socket, { username, roomId }) => {
    if(getRoomUsers(roomId).length >= MAX_PLAYERS) {
        const errorMessage = makeMessage(SERVER_NAME, 'This room is full! Try another room...')
        socket.emit(SocketEvents.ERROR, errorMessage);
    } else {
        console.log("User joined: " + username);
        const usersInRoom = getRoomUsers(roomId).length
        const welcomeMessage = makeMessage(SERVER_NAME, usersInRoom == 1 ? 'Welcome!' : 'Welcome! Waiting for another players to join...')
        socket.emit(SocketEvents.MESSAGE, welcomeMessage);
        const user = userJoin(socket.id, username, roomId);
        socket.join(user.roomId);
    
        // Broadcast an entry except to client connecting
        const broadcastMessage = makeMessage(SERVER_NAME, `${user.username} has joined`)
        socket.broadcast.to(user.roomId).emit(SocketEvents.MESSAGE, broadcastMessage);
        
        // Send users and room info
        io.to(user.roomId).emit(SocketEvents.ROOM_USERS, {
            room: user.roomId,
            users: getRoomUsers(user.roomId)
        });
    }
}

export const leaveRoom = (socket) => {
    const user = userLeave(socket.id);
    if(user != undefined){
        const leaveMessage = makeMessage(SERVER_NAME, `${user.username} has left the room :/`)
        io.to(user.roomId).emit(SocketEvents.MESSAGE, leaveMessage);
        io.to(user.roomId).emit(SocketEvents.DISCONNECT);

        console.log("User disconnected: " + user.username);
        // Send users and room info
        io.to(user.room).emit(SocketEvents.ROOM_USERS, {
            room: user.roomId,
            users: getRoomUsers(user.roomId)
        });
    }
}