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
    CARD_FROM_PILE: 'card_from_pile',
    MESSAGE: 'message',
    DISCONNECT: 'dc',
};

export const SERVER_NAME = "Server";
export const MAX_PLAYERS = 7;
export const DEFAULT_ROUNDS = 1;
export const PORT = 4000;

export const MessageTypes = {
    // Define here all default actions
    INFO: 'info',
    WARNING: 'warning',
    SUCCESS: 'success',
    ERROR: 'error',
}