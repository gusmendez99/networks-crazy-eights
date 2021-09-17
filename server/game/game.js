
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
    }

    initCardCount(){
        /*
        * Creates the cardCount object based on the players array. This object will be used to keep track of the number of cards of each player. 
        * Since we are initializing the object all players are assigned 8 cards
        */
        const cardCount = this.players.reduce((o, player)=> ({...o, [player]: CARDS_PER_HAND}), {})
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
        return this.players[this.currentPlayer];
    }

    stackCard(player, card) {
        /**
        * Given a player and a list of cards (this list could be single item list)
        * it checks if it is the turn of the player and if so, stack the card(s)
        * on the principal heap.
        * Returns the last card of principal heap
         */
        if (this.players.indexOf(player) === this.currentPlayer) {
            this.principalHeap.push.apply(this.principalHeap, card);
            this.cardCount[player] -= card.length
            return this.principalHeap.at(-1); 
        }

        return this.principalHeap.at(-1);
    
    }

    changeTurn() {
        /*
        * Change turn and returns the next player turns
        */
        this.currentPlayer = (this.currentPlayer + 1) % this.playersQuantity;
        return this.players[this.currentPlayer];
    }

    passTurn() {
        /*
         * Pass turn if you draw 3 cards from deck 
         */
        this.changeTurn();
        return this.players[this.currentPlayer];
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

    getCard() {
        /*
        * Draw card from deck 
        * Returns a card or game over if there are no more cards
         */
        if(this.deck.cards.length > 0){
            //add a card to the current player count
            const currentPlayer = this.playerTurn()
            this.cardCount[currentPlayer] += 1
            return this.deck.card;
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
                [this.players[i]] : cards[i]
            }
        }
        return distribution
    }

    // IMPORTANT, THIS FUNCTION SHOULD BE MOVED TO A DIFERENT MODULE
    suggestMove(playedCard, handDeck) {
        /*
        Checks if there is a multi-card move on a player hand
        Returns the amount of cards with the same value as the one being played and the indexes of said cards
        */ 
        const indexes_of_cards = []
        //check if there is another card in hand with the same value
        for(let i= 0; i < handDeck.length; i ++){
            if (handDeck[i].value === playedCard.value && i !== handDeck.indexOf(playedCard)) {
                //if there is add its index to the array of found cards
                indexes_of_cards.push(i)
            }
        }
        return [indexes_of_cards.length, indexes_of_cards]
    }

}

const g = new Game(["Robs", "Gus", "Micks"], 'someUidhere');
console.log("Principal heap is: ", g.principalHeap);
const cards = g.deliverCards()
console.log("Delivering cards ... \n",cards);
const [count, possitions] = g.suggestMove(cards[0][0],cards[0])
console.log("Hey Robs you have the following move...", count, possitions)
g.initCardCount()
console.log("Initial Card Count ...\n", g.cardCount)
console.log("Current player is: ", g.playerTurn());
console.log("Current player is drawing a card")
g.getCard();
console.log(g.cardCount)
g.changeTurn();
console.log("Current player is: ", g.playerTurn());
console.log("Is there a winner?: ")
console.log(g.check4Winner())
console.log("Changing the amount of cards of Gus to check if function works")
g.cardCount['Gus'] = 0
console.log("Is there a winner?: ")
console.log(g.check4Winner())

export default Game
// module.exports = Game;