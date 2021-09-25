import React, { useEffect } from 'react';

import { Registration } from '../../components/Registration';
import { WaitingRoom } from '../../components/WaitingRoom';
import { RoomForm } from '../../components/RoomForm';
import { Nav } from '../../components/Nav';
import { addResponseMessage } from 'react-chat-widget';

import { useRoom } from '../../hooks/useRoom';
import { SocketEvents, MessageTypes } from '../../settings';
import { toast } from 'react-toastify';
import GameTable from '../../components/GameTable';
import GameEnd from '../../components/GameEnd';
//node v: 12.22.3

export const Home = () => {
    const { mySocket, 
        room, 
        setRoom,
        players, 
        setPlayers, 
        setIsOwner, 
        myHand,
        updateMyHand,
        rivalsHands, 
        updateRivalsHands,
        setMainCard, 
        setTurn, 
        winner,
        setCurrentPlayer,
        currentPlayer,
        setCurrentSuit, 
        setWinner,
        setChat } = useRoom();

    useEffect(() => {
        // TODO: place this functions inside /sockets folder
        const handleDisconnect = () => {
            // Reinitialize hook values
            setRoom(undefined);
            setPlayers([]);
            setIsOwner(false);
        }
        const handleMessage = (message) => {
            switch(message.type) {
                case MessageTypes.SUCCESS: {
                    toast.success(message.content);
                    return;
                }

                case MessageTypes.INFO: {
                    toast.info(message.content);
                    return;

                }

                case MessageTypes.WARNING: {
                    toast.warn(message.content);
                    return;

                }

                case MessageTypes.ERROR: {
                    toast.error(message.content);
                    return;

                }

                default: {
                    console.log(message);   
                    return;

                }
            }
        };
        const handleRoomCreated = ({ roomId }) => setRoom(roomId);
        const handleRoomLeft = ({ roomId, username }) => {
            handleDisconnect();
        };
        const handleGamePlayersInfo = ({ roomId, players, ownerId }) => {
            // console.log(players, roomId, ownerId)
            setPlayers(players);
            setIsOwner(ownerId === mySocket.id);
            setRoom(roomId);

        };

        const handleGameStarted = (gameState) => {
            const { hand, cardCount, principalHeap, currentPlayer, currentSuit } = gameState;
            updateMyHand([ ...hand]);
            const rivalHands = Object.entries(cardCount).map(([player, value]) => ({ player, value }));
            // console.log('Rival hands: ', rivalHands);
            updateRivalsHands([...rivalHands]);
            setMainCard(principalHeap.pop());
            setTurn(currentPlayer);
            setCurrentSuit(currentSuit);
        };

        const handleGameFinished = ({ winner }) => {
            setWinner(winner);
        };

        const handleCardStacked = ({ playerId, cards }) => {
            const playerChanged = players.find(player => player.socketId === playerId)
            if (playerChanged) {
                if (mySocket.id === playerId) {
                    updateMyHand(prevHand => {
                        const newHand = [...prevHand].filter(card => !cards.some(({ suit, value }) => {
                            return card.value === value && card.suit === suit;
                        }));
                        return newHand;
                    });
                } else {
                    const newRivalHands = rivalsHands.map(rival => {
                        if(rival.player === playerChanged.username) {
                            return { player: rival.player, value: rival.value - cards.length }
                        }
                        return rival
                    })
                    updateRivalsHands([...newRivalHands]);
                }
            } 

            // Finally, update main card
            if (cards && cards.length > 0) {
                const newCardSelected = cards.pop();
                console.log('New Card on Deck = ', newCardSelected)
                setMainCard(newCardSelected)
            } 

        };

        // TODO: Review
        const handleCardFromPile = ({ card, game }) => {
            updateMyHand(prevHand => [...prevHand, card]);
        };

        const handleOpponentCardFromPile = ({playerId}) => {
            const playerChanged = players.find(player => player.socketId === playerId)
            if(playerChanged){
                const newRivalHands = rivalsHands.map(rival => {
                    if(rival.player === playerChanged.username) {
                        return { player: rival.player, value: rival.value +1 }
                    }
                    return rival
                })
                updateRivalsHands([...newRivalHands]);
            }         
        }

        const handleTurnPassed = (data) => {
            setCurrentPlayer(players
                .findIndex(player => 
                    player.username === data.currentPlayer));
            
            toast.info(`Current player has passed because draw 3 cards, now it's turn for ${data.currentPlayer}`);
            // updateRivalsHand(); not needed because in cardFromPile already updates rivalHands
        };

        const handleTurnChanged = (data) => {
            setCurrentPlayer(players
                .findIndex(player => 
                    player.username === data.currentPlayer));
            
        };

        const handleSuitChanged = ({ cardWithNewSuit }) => {
            setMainCard(cardWithNewSuit);
        };

        const handleMessageReceived = ({ id, message, from, createdAt }) => {
            const newMessage = { message, from, createdAt}
            setChat(prevChat => [...prevChat, newMessage]);
            addResponseMessage(`${from}: ${message}`, id);
        };

        mySocket.on(SocketEvents.DISCONNECT, handleDisconnect);
        mySocket.on(SocketEvents.ROOM_CREATED, handleRoomCreated);
        mySocket.on(SocketEvents.MESSAGE, handleMessage);
        mySocket.on(SocketEvents.ROOM_PLAYERS, handleGamePlayersInfo);
        mySocket.on(SocketEvents.ROOM_LEFT, handleRoomLeft);
        mySocket.on(SocketEvents.GAME_STARTED, handleGameStarted);
        mySocket.on(SocketEvents.GAME_FINISHED, handleGameFinished);
        mySocket.on(SocketEvents.CARD_STACKED, handleCardStacked);
        mySocket.on(SocketEvents.CARD_FROM_PILE, handleCardFromPile);
        mySocket.on(SocketEvents.TURN_PASSED, handleTurnPassed);
        mySocket.on(SocketEvents.TURN_CHANGED, handleTurnChanged);
        mySocket.on(SocketEvents.SUIT_CHANGED, handleSuitChanged);
        mySocket.on(SocketEvents.MESSAGE_SENT, handleMessageReceived);
        mySocket.on(SocketEvents.OPPONENT_CARD_FROM_PILE, handleOpponentCardFromPile);
        
        return () => {
            mySocket.off(SocketEvents.DISCONNECT, handleDisconnect);
            mySocket.off(SocketEvents.ROOM_CREATED, handleRoomCreated);
            mySocket.off(SocketEvents.MESSAGE, handleMessage);
            mySocket.off(SocketEvents.ROOM_PLAYERS, handleGamePlayersInfo);
            mySocket.off(SocketEvents.ROOM_LEFT, handleRoomLeft);
            mySocket.off(SocketEvents.GAME_STARTED, handleGameStarted);
            mySocket.off(SocketEvents.GAME_FINISHED, handleGameFinished);
            mySocket.off(SocketEvents.CARD_STACKED, handleCardStacked);
            mySocket.off(SocketEvents.CARD_FROM_PILE, handleCardFromPile);
            mySocket.off(SocketEvents.TURN_PASSED, handleTurnPassed);
            mySocket.off(SocketEvents.TURN_CHANGED, handleTurnChanged);
            mySocket.off(SocketEvents.SUIT_CHANGED, handleSuitChanged);
            mySocket.off(SocketEvents.MESSAGE_SENT, handleMessageReceived);
            mySocket.off(SocketEvents.OPPONENT_CARD_FROM_PILE, handleOpponentCardFromPile);

        } 
    }, [
        mySocket, players, rivalsHands, currentPlayer, winner,
        setChat, setCurrentPlayer, setCurrentSuit, setIsOwner,
        setMainCard, setPlayers, setRoom, setTurn, setWinner, 
        updateMyHand, updateRivalsHands,
    ])
    // [mySocket, players, rivalsHands, currentPlayer, winner])

    return (
        <div className="container">
            <Nav />

            {
                winner ? (
                    <GameEnd />
                ) : (
                    room ? (
                        myHand ? <GameTable /> : <WaitingRoom />
                    ) : (
                        <>
                            <Registration />
                            <RoomForm />
                        </>       
                    )
                )
            }
        </div>
    )
};

export default Home;