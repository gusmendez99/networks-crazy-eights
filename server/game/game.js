
/*
This class holds the game state and all actions 
that can be made to change from one state to another
*/

import Deck  from './deck.js';


const CARDS_PER_HAND = 8;

class Game {

    constructor(players, roomId) {
        /*
        * Creates a new crazy-8 game given a list of players and a roomId
        */
        this.gameId=roomId //this is intended to be the roomId because server needs to identify different game instances
        this.deck = new Deck;
        this.players = players;
        this.playersQuantity = players.length;
        this.principalHeap = this.definePrincipalHeapCard(); //This is the heap or pile that the playe must put cards over
        this.currentPlayer = 0;
        this.currentSuit = '';
        this.cardLimit = ["", 0];
    }

    changeSuit(suit) {
        if(suit) {
            this.principalHeap.push({value:"8", suit:suit});
            return true;
        } else {
            return false;
        }
    
    }

    resetCardLimit() {
        this.cardLimit[0] = "";
        this.cardLimit[1] = 0;
        return this.cardLimit;
    }


    updateCardLimit(player) {
        this.cardLimit[0] = player;
        this.cardLimit[1] = this.cardLimit[1] +1;
        return this.cardLimit;
    }

    // TODO: handle when a player leaves the game...

    initCardCount(){
        /*
        * Creates the cardCount object based on the players array. This object will be used to keep track of the number of cards of each player. 
        * Since we are initializing the object all players are assigned 8 cards
        */
        const cardCount = this.players.reduce((o, player)=> ({...o, [player.username]: CARDS_PER_HAND}), {})
        this.cardCount = cardCount 
    }
    
    deliverCards() {
        /*
        * This function returns an an array of 8-lenght arrays 
        which are the cards for each player in playersQuiantity
        */
       const hands4players = new Array();
       for(let i = 0; i < this.playersQuantity; i++) {
            let hand = new Array(); 
            for(let j=0; j < CARDS_PER_HAND; j++) {
                hand.push(this.deck.card);
            }
            hands4players.push(hand);
       }
        return hands4players; 
    }

    definePrincipalHeapCard() {
        /*
        * This function initialize principal heap with a card 
        selected from deck.
        */
        const heap = new Array();
        heap.push(this.deck.card);
        return heap;
    }

    playerTurn() {
        return this.players[this.currentPlayer].username;
    }

    getCurrentPlayerTurn() {
        return this.players[this.currentPlayer];
    }

    principalHeapCard() {
        const card = this.principalHeap.pop();
        this.principalHeap.push(card);
        return card;
    }

    stackCards(playerId, cards) {
        /**
        * Given a player name and a list of cards (this list could be single item list)
        * it checks if it is the turn of the player and if so, stack the card(s)
        * on the principal heap.
        * Returns the last card of principal heap
         */
        const playerIdx = this.players.findIndex(player => player.socketId === playerId)

        if (playerIdx !== -1 && playerIdx === this.currentPlayer) {
            const player = this.players[playerIdx];
            cards.forEach(card => this.principalHeap.push(card))
            this.cardCount[player.username] -= cards.length
            return true; 
        }

        return false;
    }

    changeTurn() {
        /*
        * Change turn and returns the next player turns
        */
        this.currentPlayer = (this.currentPlayer + 1) % this.playersQuantity;
        return this.players[this.currentPlayer].username;
    }

    passTurn() {
        /*
         * Pass turn if you draw 3 cards from deck 
         */
        this.changeTurn();
        return this.players[this.currentPlayer].username;
    }


    check4Winner(playersHands) {
        /*
        * Checks if there is a player with 0 cards on hand
        */
        for(var [key, value] of Object.entries(this.cardCount)){
            if(value === 0){
                return key
            }
        }
        return false
    }

    getCard(playerId) {
        /*
        * Draw card from deck 
        * Returns a card or game over if there are no more cards
         */
        if(this.deck.cards.length > 0){
            //add a card to the current player count
            const playerIdx = this.players.findIndex(player => player.socketId === playerId)
            if (playerIdx !== -1 && playerIdx === this.currentPlayer) return this.deck.card;
            // If its not mu turn...
            return undefined;
        }

        this.gameOver();
        return {};
    }

    gameOver() {
        return false
    }

    checkMove(card) {
        /*
        * If list of cards are equal in value or suit to the card in principal heap
        * then is a valide move, return True, else return False
        */
        const card_val = card[0].value; 
        //lets check if the list of cards match with game criteria
        for(let i=0; i < card.length; i ++) {
            if(card[i].value !== card_val) {
                return false; //it is not a valid sequence of cards
            }

            if(card[i].value !== this.principalHeap.at(-1).value && card[i].suit !== this.principalHeap.at(-1).suit) {
                return false;
            }
        }

        return true;

    }

    distributeCards(cards) {
        /*
        Function used to asign the generated hands to each player
        */
        let distribution = {}
        for(let i = 0; i < this.playersQuantity; i ++){
            distribution = {
                ...distribution,
                [this.players[i].username] : cards[i]
            }
        }
        return distribution
    }

}

// const g = new Game(["Robs", "Gus", "Micks"], 'someUidhere');
// console.log("Principal heap is: ", g.principalHeap);
// const cards = g.deliverCards()
// console.log("Delivering cards ... \n",cards);
// const [count, possitions] = g.suggestMove(cards[0][0],cards[0])
// console.log("Hey Robs you have the following move...", count, possitions)
// g.initCardCount()
// console.log("Initial Card Count ...\n", g.cardCount)
// console.log("Current player is: ", g.playerTurn());
// console.log("Current player is drawing a card")
// g.getCard();
// console.log(g.cardCount)
// g.changeTurn();
// console.log("Current player is: ", g.playerTurn());
// console.log("Is there a winner?: ")
// console.log(g.check4Winner())
// console.log("Changing the amount of cards of Gus to check if function works")
// g.cardCount['Gus'] = 0
// console.log("Is there a winner?: ")
// console.log(g.check4Winner())
// console.log(g.players);
// console.log(g.cardCount);
// console.log(g.principalHeapCard());
// console.log(g.principalHeapCard());
// console.log(g.principalHeapCard());

// console.log(g.check4Winner()) 

// console.log(g.updateCardLimit("Gus"));
// // it would reset when turn is called
// console.log(g.updateCardLimit("Rob"));
// console.log(g.updateCardLimit("Micks"));
// console.log(g.resetCardLimit());

export default Game;
// module.exports = Game;