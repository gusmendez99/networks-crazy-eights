export const HOST = 'http://127.0.0.1:4000'
export const TIMEOUT = 10000;
export const DEFAULT_ROUNDS = 1;
export const MAX_PLAYERS = 4;
export const MAX_DISPLAYING_HAND_CARDS = 5;

export const SocketEvents = {
    CONNECT: 'connection',
    USER_REGISTER: 'user_registered',
    ROOM_CREATE_OR_JOIN: 'room_create_or_join',
    ROOM_CREATED: 'room_created',
    ROOM_LEAVE: 'room_leave',
    ROOM_LEFT: 'room_left',
    ROOM_PLAYERS: 'room_players',
    GAME_START: 'game_start',
    GAME_FINISHED: 'game_finished',
    MESSAGE: 'message',
    DISCONNECT: 'dc',
    SEND_MESSAGE: 'send_message',
    MESSAGE_SENT: 'message_sent',
};
