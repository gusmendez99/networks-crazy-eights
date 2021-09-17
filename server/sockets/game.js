import Game from '../game/game.js'
import { io } from './index.js'
import { SocketEvents, MessageTypes, SERVER_NAME} from '../settings.js'
import { makeMessage } from '../utils/index.js'

// Runtime persistence
const availableGames = []
export const findGameById = id => availableGames.find(game => game.id === id);

export const startGame = (socket, {roomId, players}) => {
    
    let game = findGameById(roomId)
    // Check if the game that wants to start for some reason already exists
    if(game){
        const errorMessage = makeMessage(SERVER_NAME, `Game with ID ${roomId} is already in progress`, MessageTypes.ERROR)
        socket.emit(SocketEvents.MESSAGE, errorMessage);
    } else {
        if (!game) {
            game = new Game(players, roomId);
            availableGames.push(game);
        }
        // Run game start related actions, handing cards and init the card count of each player
        const hands = game.deliverCards()
        game.initCardCount()
        const cardDistribution = game.distributeCards(hands)
        socket.join(game.gameId)
        
        // Send game state and hand to each player
        game.players.map( player => 
            io.to(player.socketId).emit(SocketEvents.GAME_START, {
            ...game,
            hand: cardDistribution[player.username]
            })
        )
    }
}

export const drawCard = (socket, {roomId}) => {
    const game = findGameById(roomId)
    if(!game){
        const errorMessage = makeMessage(SERVER_NAME, `Game with ID ${roomId} does not exists, how did you get here?`, MessageTypes.ERROR);
        socket.emit(SocketEvents.MESSAGE, errorMessage);
    } else {
        const currentPlayer = game.playerTurn()
        const currentPlayerId = currentPlayer.socketId
        const card = game.getCard()

        //Send the player the drawn card
        io.to(currentPlayerId).emit(SocketEvents.CARD_FROM_PILE, {card})
    }
}