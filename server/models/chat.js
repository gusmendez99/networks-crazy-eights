import moment from "moment";

class Chat {
    constructor(message, from) {
        /* Creates a new chat message */
        this.message = message;
        this.from = from;
        this.createdAt = moment();
    }
}

export default Chat