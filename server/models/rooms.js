import moment from "moment";

class Room {
    constructor(id, ownerSocketId, rounds) {
        /* Creates a new crazy-8 room */
        this.id = id;
        this.ownerSocketId = ownerSocketId;
        this.rounds = rounds;
        this.createdAt = moment();
        this.players = [];
    }

    joinPlayer(player) {
        this.players.push(player);
    }

    removePlayer(playerId) {
        const index = this.players.findIndex(user => user.socketId === playerId);
        // Return deleted element or undefined if not
        if(index  !== -1) return this.players.splice(index, 1)[0];
    }

}

export default Room;