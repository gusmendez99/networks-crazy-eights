
class Deck {

    constructor() {
        this.cards = new Array();
        this.buildDeck();
        this.scrambleCards();
    }


    get card() {
        return this.cards.pop();
    }

    scrambleCards() { 
        for(let i = 0; i < this.cards.length; i++) {
            const j = Math.floor(Math.random() * this.cards.length);
            const temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }

    buildDeck() {
        const suits = ["spades", "diamonds", "clubs", "hearts"];
        const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        

        for(let i = 0; i < suits.length; i ++) {
            for(let j = 0; j < values.length; j++){

                const card = {value: values[j], suit: suits[i]};
                this.cards.push(card);

            }
        }
    }

}

module.exports = Deck;

// d = new Deck();
// d.scrambleCards();
// d.scrambleCards();
// d.scrambleCards();


// Example for get a card from deck
// console.log(d.card);
// console.log(d.card);
// console.log(d.card);
// console.log(d.card);
// console.log(d.card);
// console.log(d.card);
// console.log(d.card);
// console.log(d.card);



