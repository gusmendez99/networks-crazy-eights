import moment from 'moment';

export const makeMessage = (sender, content) => {
    return {
        sender,
        content,
        time: moment().format('h:mm a')
    }
}