import Game from '../game/game.js'
import { io } from './index.js'
import { SocketEvents, MessageTypes, SERVER_NAME} from '../settings.js'
import { makeMessage } from '../utils/index.js'

// Just to get info about related game room
import { findRoomById } from './rooms.js'

// Runtime persistence
const availableGames = []
//GAME MADE WITH THE IDEA OF TESTIG
export const findGameById = id => availableGames.find(game => game.id === id);

export const startGame = (socket, { roomId }) => {
    const room = findRoomById(roomId);
    if(!room) {
        const errorMessage = makeMessage(SERVER_NAME, `Can't retrieve players on room ID: ${roomId}.`, MessageTypes.ERROR)
        socket.emit(SocketEvents.MESSAGE, errorMessage);
        return
    }
    
    const players = room.players || [];
    let game = findGameById(roomId)
    // Check if the game that wants to start for some reason already exists
    if(game){
        const errorMessage = makeMessage(SERVER_NAME, `Game with ID ${roomId} is already in progress in this room`, MessageTypes.ERROR)
        socket.emit(SocketEvents.MESSAGE, errorMessage);
        return;
    }
    
    game = new Game(players, roomId);
    availableGames.push(game);
    // Run game start related actions, handing cards and init the card count of each player
    const hands = game.deliverCards()
    game.initCardCount()
    const cardDistribution = game.distributeCards(hands)
    // It's not necessary to create a new SocketIO room here. Socket belongs to an unique SocketIO room...
    // socket.join(game.gameId)
    
    // Send game state and hand to each player
    game.players.forEach( player => {        
        // Notify game players
        const gameStartedMessage = makeMessage(SERVER_NAME, 'Game has started!', MessageTypes.SUCCESS)
        io.to(player.socketId).emit(SocketEvents.MESSAGE, gameStartedMessage);
        io.to(player.socketId).emit(SocketEvents.GAME_STARTED, {
            ...game,
            hand: cardDistribution[player.username]
        })
    })
}

export const drawCard = (socket, {roomId}) => {
    console.log("HEY SOMEONE WANTS A CARD")
    let game = findGameById(roomId)
    if(!game){
        console.log(`How did ${socket.id} got here?`)
        // const errorMessage = makeMessage(SERVER_NAME, `Game with ID ${roomId} does not exists, how did you get here?`, MessageTypes.ERROR);
        // socket.emit(SocketEvents.MESSAGE, errorMessage);
        
        /* THIS IS USED FOR TESTING THIS FUNCTION IN A VOID, WHEN IN THE REAL GAME ERASE THE LINES UNDER THIS COMMENT
        AND UNCOMMENT THE LINES ABOVE  
        */
        game = new Game([],'000') 
        const card = game.getCard()
        console.log(card)
        const result = io.to(socket.id).emit(SocketEvents.CARD_FROM_PILE, {card})
        console.log(result)
    } else {
        console.log("GOOD TO GO")
        const currentPlayer = game.playerTurn()
        const currentPlayerId = currentPlayer.socketId
        const card = game.getCard()

        //Send the player the drawn card
        io.to(currentPlayerId).emit(SocketEvents.CARD_FROM_PILE, {card})
    }
}
