import moment from 'moment';
import { MessageTypes } from '../settings.js';

export const makeMessage = (sender, content, type = MessageTypes.INFO) => {
    return {
        sender,
        content,
        type,
        time: moment().format('h:mm a')
    }
}