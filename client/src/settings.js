export const HOST = 'http://127.0.0.1:4000'
export const TIMEOUT = 60000;
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
    GAME_STARTED: 'game_started',
    GAME_FINISH: 'game_finish',
    GAME_FINISHED: 'game_finished',
    CARD_FROM_PILE: 'card_from_pile',
    REQUEST_CARD_FROM_PILE: 'request_card_from_pile',
    MESSAGE: 'message',
    DISCONNECT: 'dc',
    GAME_MOVE: 'game_move',
    TURN_PASS: 'turn_pass',
    CARD_STACK: 'card_stack',
    CARD_STACKED: 'card_stacked',
    TURN_PASSED: 'turn_passed',
    TURN_CHANGE: 'turn_change',
    TURN_CHANGED: 'turn_changed',
    ALERT_SUIT_CHANGE: 'alert_suit_change',
    SUIT_CHANGED: 'suit_changed',
    SEND_MESSAGE: 'send_message',
    MESSAGE_SENT: 'message_sent',
    OPPONENT_CARD_FROM_PILE: 'opponent_card_from_pile',
    SUIT_CHANGE: 'suit_change',
    SUIT_CHANGED: 'suit_changed',
};


export const MessageTypes = {
    // Define here all default actions
    INFO: 'info',
    WARNING: 'warning',
    SUCCESS: 'success',
    ERROR: 'error',
}
