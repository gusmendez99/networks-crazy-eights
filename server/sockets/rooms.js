import Player from '../models/players.js';
import Room from '../models/rooms.js';
import Chat from '../models/chat.js';
import { io } from './index.js';
import { SocketEvents, MessageTypes, SERVER_NAME, MAX_PLAYERS, DEFAULT_ROUNDS } from '../settings.js';
import { makeMessage } from '../utils/index.js';

// Runtime persistence
const availableRooms = [];
export const findRoomById = id => availableRooms.find(room => room.id === id);

export const createOrJoinRoom = (socket, { username, roomId, isNew, rounds = DEFAULT_ROUNDS }) => {
    // NOTE: roomId must be generated with uuid v4 on React

    let room = findRoomById(roomId);
    if(!room && !isNew) {
        const errorMessage = makeMessage(SERVER_NAME, `Room with ID ${roomId} does not exists.`, MessageTypes.ERROR)
        socket.emit(SocketEvents.MESSAGE, errorMessage);
    } else if (room && room.players.length >= MAX_PLAYERS) {
        const errorMessage = makeMessage(SERVER_NAME, `Room with ID ${roomId} is full! Please join/create another room.`, MessageTypes.ERROR)
        socket.emit(SocketEvents.MESSAGE, errorMessage);
    } else if (room && room.players.find(player => player.username === username)) {
        const errorMessage = makeMessage(SERVER_NAME, `Username '${username}' has already been taken! Please choose another.`, MessageTypes.ERROR)
        socket.emit(SocketEvents.MESSAGE, errorMessage);
    } else {
        const newPlayer = new Player(socket.id, username, roomId);
        if (!room && isNew) {
            room = new Room(roomId, newPlayer.socketId, rounds);
            availableRooms.push(room);
            socket.emit(SocketEvents.ROOM_CREATED, { roomId });
        }
        room.joinPlayer(newPlayer);
        socket.join(room.id);
        console.log(`User ${newPlayer.username} joined to room ID: ${room.id}.`);      
        
        // Send notification as message, broadcast an entry except to player connecting
        const welcomeText = room.players.length === 1 ? 'Welcome!' : 'Welcome! Waiting for another players to join...'
        const welcomeMessage = makeMessage(SERVER_NAME, welcomeText, MessageTypes.SUCCESS);
        const broadcastMessage = makeMessage(SERVER_NAME, `${newPlayer.username} has joined to your room.`)

        socket.emit(SocketEvents.MESSAGE, welcomeMessage);
        socket.broadcast.to(room.id).emit(SocketEvents.MESSAGE, broadcastMessage);
        
        // Send players and room info
        io.to(room.id).emit(SocketEvents.ROOM_PLAYERS, {
            roomId: room.id,
            players: room.players,
            ownerId: room.ownerSocketId,
        });
    }
}

export const leaveRoom = (socket, { roomId }) => {
    const room = findRoomById(roomId);
    if (!room) {
        const errorMessage = makeMessage(SERVER_NAME, `Room with ID ${roomId} does not exists, try again.`, MessageTypes.ERROR);
        socket.emit(SocketEvents.MESSAGE, errorMessage);
    } else {
        const playerId = socket.id
        const playerRemoved = room.removePlayer(playerId);
        if (playerRemoved) {  
            const { socketId, username } = playerRemoved;
            const isOwner = socketId === room.ownerSocketId;          
            socket.leave(room.id);
            socket.emit(SocketEvents.ROOM_LEFT, { roomId, username });
            console.log(`Player (${ isOwner ? ' and owner' : ''}) disconnected from room ID ${room.id}: ${username}`);
            // TODO: Consider assign a random player as the room owner if the current owner left the game & room.players.length > 1 
            if (isOwner) {
                // Disconnect themselves & all players from current room
                io.to(room.id).emit(SocketEvents.DISCONNECT);
                const index = availableRooms.indexOf(room);
                availableRooms.splice(index, 1)[0];
            } else {
                socket.leave(room.id);
                const leaveMessage = makeMessage(SERVER_NAME, `${username} has left the room`)
                io.to(room.id).emit(SocketEvents.MESSAGE, leaveMessage);
                // Send players and room info
                io.to(room.id).emit(SocketEvents.ROOM_PLAYERS, {
                    roomId: room.id,
                    players: room.players,
                    ownerId: room.ownerSocketId,
                });
            }
        } else {
            const errorMessage = makeMessage(SERVER_NAME, `Error on leaving room with ID ${roomId}`, MessageTypes.ERROR);
            socket.emit(SocketEvents.MESSAGE, errorMessage);
        }
    }
}

export const sendChat = (socket, { roomId, from,message}) => {
    
    let room = findRoomById(roomId);
    if(!room){
        const errorMessage = makeMessage(SERVER_NAME, `The chat with ID ${roomId} does not exists. How did you get here?`, MessageTypes.ERROR)
        socket.emit(SocketEvents.MESSAGE, errorMessage);
    } else {
        //Send the chat to everyone in the room

        console.log(`Message: ${message}, from: ${from}`)
        const chat = new Chat(message, from)
        console.log(chat.createdAt)
        socket.broadcast.to(room.id).emit(SocketEvents.MESSAGE_SENT, {
            message: chat.message,
            from: chat.from,
            createdAt: chat.createdAt,
        })
    }
}