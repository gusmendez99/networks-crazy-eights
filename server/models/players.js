import moment from "moment";

class Player {
    constructor(socketId, username, roomId) {
        /* Creates a new crazy-8 player */
        this.socketId = socketId;
        this.username = username;
        this.createdAt = moment();
    }
}
 
export default Player;