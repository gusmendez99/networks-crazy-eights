import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

class Chat {
    constructor(message, from) {
        /* Creates a new chat message */
        this.id = uuidv4();
        this.message = message;
        this.from = from;
        this.createdAt = moment();
    }
}

export default Chat;