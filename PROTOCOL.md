# Protocol
Messages format, like action & payload

## Events & Payloads:

- [x] User Registration: 
  
        action: USER_REGISTER
        payload: {
            username
        }

    Response: USER_REGISTERED, { status }

- [x] Create or Join Room: 
  
        action: ROOM_CREATE_OR_JOIN
        payload: {
            username,
            roomId,
            isNew,
            rounds,
        }

    Response: ROOM_CREATED, { roomId, username }
    Response: ROOM_PLAYERS, { roomId, players, ownerId }

- [x] Leave Room: 
  
        action: ROOM_LEAVE
        payload: {
            roomId,
        }
    
    Response: ROOM_LEFT, { roomId, username }
    Response: ROOM_PLAYERS, { roomId, players, ownerId }

- [x] Start Game: 
  
        action: GAME_START
        payload: {
            roomId
        }

    Response (all): GAME_STARTED, { status, deck, initCard }

- [x] Game Move: 
  
        action: GAME_MOVE
        payload: {
            cards,
            roomId,
        }
    
    Response (all): same

- [x] Request card from pile:

        action: REQUEST_CARD_FROM_PILE
        payload: {
         roomId   
        }
    Response: CARD_FROM_PILE, { card }


- [x] Pass Turn: 
  
        action: PASS_TURN
        payload: {
            currentPlayer,
            currentCard,
        }
    
    Response (all): TURN_PASSED, same


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

- [x] Error:

        action: ERROR
        payload: {
            errorDescription,
            errorCode
        }
