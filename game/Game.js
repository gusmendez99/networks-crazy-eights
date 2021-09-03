
/*
This class holds the game state and all actions 
that can be made to change from one state to another
*/

import { Deck } from './Deck';

class Game {

    constructor(playersQuantity, roomId) {
        this.gameId=roomId //this is intended to be the roomId because server needs identify different game instances
        this.deck = new Deck();
        this.playersQuantity = playersQuantity;
        this.turns = [...Array(playersQuantity).keys()];
        this.principleHeap = this.definePrincipalHeapCard();
    }

    definePrincipalHeapCard() {
        /*This methods take a card from deck an start the game*/
        return
    }

    stackCard(player, card) {
        return
    }

    changeTurn(currentPlayer) {
        return
    }

    passTurn(currentPlayer) {
        return
    }

    gameOver() {
        return
    }

    check4Winner(playersHands) {
        /*
        Checks if there is a player with 0 cards on hand
        */
        return
    }

    getCard() {
        return this.deck.card;
    }

    deliverCards() {
        return //this could be an array of 8-length arrays 
    }

    checkMove(card) {
        /*
        If card is equal in rank or suit to the card in principal heap
        then is a valide move, return True, else return False
        */
        return 
    }

    suggestMove(handDeck) {
        /*
        Checks if there is a multi-card move on a player hand
        */ 
        return 
    }





}
