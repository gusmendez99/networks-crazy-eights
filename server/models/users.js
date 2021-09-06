const users = [];

class User {
    constructor(socketId, username, roomId) {
        /* Creates a new crazy-8 user */
        this.socketId = socketId;
        this.username = username;
        this.roomId = roomId;
    }
}

// Join player
export const userJoin = (id, username, roomId) => {
    const user = new User(id, username, roomId);
    users.push(user);
    return user;
}

// Get the current user
export const getCurrentUser = id => users.find(user => user.socketId === id);

// Get room users
export const getRoomUsers = roomId => users.filter(user => user.roomId === roomId);

// User leaves chat
export const userLeave = id => {
    const index = users.findIndex(user => user.socketId === id);
    // Return deleted element or undefined if not
    if(index  !== -1) return users.splice(index, 1)[0];
}
