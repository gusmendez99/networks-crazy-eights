# Crazy Eights: React & Express with SocketIO
Crazy Eights Game - Networks Project 2

## Protocol Description
Read about all actions & payloads [here](https://github.com/gusmendez99/networks-crazy-eights/blob/main/PROTOCOL.md)


## Online Game
[Play Online Game here!](https://infallible-bhaskara-96f9ff.netlify.app/)

Our game app is quite intuitive to be able to explain how it works. You can create your room to play Crazy Eights and share the ID with your friends, also chat with them.

![online](https://github.com/gusmendez99/networks-crazy-eights/blob/main/images/online.png?raw=true)

**Demo**

[Demo - YouTube](https://youtu.be/SiOIKANS_oU)

## About Crazy Eights

Crazy Eights is a fun card game (like UNO) that can be played with a standard 52 card deck. You need at least 2 people to play. 

**Starting the Game** 

Typically 2 to 4 people play Crazy Eights. The remaining cards go in a stack face down in the middle. Turn the top card over. 

**Playing the Game**

The player to the left of the dealer starts the game and turns move clockwise from there. During a player's turn they can play cards face up that match the current card in either suit (i.e. hearts, diamonds, etc) or rank. For example, if the current face up card is the 5 of clubs, you may play either a five or a clubs. Eights are wild and can be played at any time. When a player plays an eight, they then get to pick the current suit, whether that be hearts, clubs, spades, or diamonds. If the player can't match the top cards, then they must draw cards from the deck until they get a match. Once the draw pile is empty, then players that don't have a match, lose their turn.

**Winning the Game**

The first player to discard all their cards is the winner!

-> Read more at: [Ducksters](https://www.ducksters.com/games/crazy_eights_rules.php) 


## How to run it (local)
Install dependencies on `client` and `server` folders. Then, open 2 terminals.

1. Server
```
cd server
yarn start
```

2. Client
```
cd client
yarn start
```

## Built with
This project features this tools

- ⚛ **[React](https://reactjs.org)** - Frontend
- 🚀 **[Webpack](https://webpack.js.org/)**  — Optimized Build
- 💅 **[SASS](https://postcss.org/)** — Styles
- 🕸️  **[SocketIO](https://socket.io/)** — Communication

### Difficulties and learning
- Correct use of sockets for communication between clients and server, with SocketIO
- Development of an intuitive interface for players
- Event handling and define our protocol (action & payload)

## Authors
* **Gus Mendez** ([gusmendez99](https://github.com/gusmendez99))
* **Roberto Figueroa** ([RobertoFigueroa](https://github.com/RobertoFigueroa))
* **Michele Benvenuto** ([michelebenveuto](https://github.com/michelebenveuto))
