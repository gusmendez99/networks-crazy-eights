# Protocol
Messages format, like action & payload

## Events & Payloads:

- [x] User Registration: 
  
        action: USER_REGISTER
        payload: {
            username
        }

    Response: USER_REGISTERED, { status }

- [x] Create Room: 
  
        action: ROOM_CREATE
        payload: {
            name,
            owner,
            rounds,
        }

    Response: ROOM_CREATED, { roomId }

- [x] Join Room: 
  
        action: ROOM_JOIN
        payload: {
            username,
            nickname,
            roomId,
        }
    
    Response (all): ROOM_JOINED, same

- [x] Leave Room: 
  
        action: ROOM_LEAVE
        payload: {
            username,
            roomId,
        }
    
    Response (all): ROOM_LEFT, same

- [x] Start Game: 
  
        action: GAME_START
        payload: {
            roomId
        }

    Response (all): GAME_STARTED, { status, deck, initCard }

- [x] Game Move: 
  
        action: GAME_MOVE
        payload: {
            card,
            roomId,
        }
    
    Response (all): same

- [x] Change Turn: 
  
        action: TURN_CHANGE
        payload: {
            currentPlayer,
            currentCard,
        }
    
    Response (all): TURN_CHANGED, same

- [x] Stack Card: 
  
        action: CARD_STACK
        payload: {
            newCard,
            currentCard,
        }
    
    Response (all): CARD_STACKED, same

- [x] Change Suit: 
  
        action: ALERT_SUIT_CHANGE
        payload: {
            newSuit
        }
    
    Response (all): SUIT_CHANGED, same

- [x] Game Finished: 
  
        action: GAME_FINISHED
        payload: {
            winner,
        }
    
    Response (all): same (winner can be null)

- [x] Chat Sent:

        action: SEND_MESSAGE
        payload: {
            nickname,
            roomId,
            message,
        }
    
    Response (all): MESSAGE_SENT, same
