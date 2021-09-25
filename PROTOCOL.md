# Protocol
Messages format, like action & payload

## Events & Payloads:

- [x] **Create or Join Room:** 
  
        action: ROOM_CREATE_OR_JOIN
        payload: {
            username,
            roomId,
            isNew,
            rounds,
        }

    Response: ROOM_CREATED, { roomId }
    Response: ROOM_PLAYERS, { roomId, players, ownerId }

- [x] **Leave Room:** 
  
        action: ROOM_LEAVE
        payload: {
            roomId,
        }
    
    Response: ROOM_LEFT, { roomId, username }
    Response: ROOM_PLAYERS, { roomId, players, ownerId }

- [x] **Start Game:** 
  
        action: GAME_START
        payload: {
            roomId
        }

    Response (all): GAME_STARTED, { ...Game, hand }

- [x] **Request card from pile:**

        action: CARD_FROM_PILE
        payload: {
         roomId   
        }
    Response: CARD_FROM_PILE, { Game, card }
    Response: OPPONENT_CARD_FROM_PILE, { playerId }

- [x] **Game Finished:**
  
        action: GAME_FINISHED
        payload: {
            roomId,
        }
    
    Response (all): GAME_FINISHED, { winner }


- [x] **Pass Turn:** 
  
        action: TURN_PASS,
        payload: {
            roomId,
        }
    
    Response (all): TURN_PASSED, { currentPlayer }


- [x] **Change Turn:** 
  
        action: TURN_CHANGE
        payload: {
            roomId
        }
    
    Response (all): TURN_CHANGED, { currentPlayer, currentCard }

- [x] **Stack Card:** 
  
        action: CARD_STACK
        payload: {
            roomId,
            cards,
        }
    
    Response (all): CARD_STACKED, { playerId, cards }

- [x] **Change Suit:** 
  
        action: ALERT_SUIT_CHANGE
        payload: {
            roomId,
            suit,
        }
    
    Response (all): SUIT_CHANGED, { playerId, cadWithNewSuit }

- [x] **Chat Sent:**

        action: SEND_MESSAGE
        payload: {
            roomId,
            from,
            message,
        }
    
    Response (all): MESSAGE_SENT, { id, message, from, createdAt}

- [x] **Error/Info:**

        action: MESSAGE,
        payload: {
            sender,
            content,
            type,
            time,
        }

- [x] **Send players in a room from server:**

        action: ROOM_PLAYERS, 
        payload: {
            roomId,
            players,
            ownerId
        }

- [x] **Send disconnect alert:**

        action: DISCONNECT,

