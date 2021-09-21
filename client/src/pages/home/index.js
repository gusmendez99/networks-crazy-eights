import React, { useEffect } from 'react';

import { Registration } from '../../components/Registration';
import { WaitingRoom } from '../../components/WaitingRoom';
import { RoomForm } from '../../components/RoomForm';
import { Nav } from '../../components/Nav';
import { addResponseMessage } from 'react-chat-widget';

import { useRoom } from '../../hooks/useRoom';
import { SocketEvents, MessageTypes } from '../../settings';
import { socket } from '../../sockets';
import { toast } from 'react-toastify';
//node v: 12.22.3

export const Home = () => {
    const { mySocket, 
        room, 
        setRoom, 
        setPlayers, 
        setIsOwner, 
        myHand,
        updateMyHand, 
        updateRivalsHand, 
        rivalsHand,
        setMainCard, 
        setTurn, 
        turn,
        setCurrentSuit, 
        setWinner, 
        chat,
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
            console.log(players, roomId, ownerId)
            setPlayers(players);
            setIsOwner(ownerId === mySocket.id);
            setRoom(roomId);

        };

        const handleGameStarted = ({ game }) => {
            // updateMyHand([ ...game.myHand]);
            // updateRivalsHand([...game.cardCount]);
            // setMainCard(game.principalHeap.pop());
            // setTurn(game.currentPlayer);
            // setCurrentSuit(game.currentSuit);
            console.log("Game started!");
        };

        const handleGameFinished = ({ winner }) => {
            setWinner(winner);
        };
        
        const handleGameMove = ({ game }) => {
            updateRivalsHand([...game.cardCount]);
            setMainCard(game.principalHeap.pop());
            setTurn(game.currentPlayer);
            setCurrentSuit(game.currentSuit);
        };

        const handleCardFromPile = ({ card, game }) => {
           if (game.currentPlayer == mySocket) { //means its my turn and I get the card
            updateMyHand([...myHand, card]);
           }
           else {
               updateRivalsHand(game.cardCount); //it updates the cardCount of the rivals hand becuase it is not my turn
           }
        };

        const handleTurnPassed = ({ currentPlayer }) => {
            setTurn(currentPlayer.username);
            toast.info(`Current player has passed now it's turn for ${turn}`);
            // updateRivalsHand(); not needed because in cardFromPile already updates rivalHands
        };

        const handleTurnChanged = ({ currentPlayer }) => {
            setTurn(currentPlayer.username);
            
        };

        const handleSuitChanged = ({ newSuit }) => {
            setCurrentSuit(newSuit);
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
        mySocket.on(SocketEvents.GAME_MOVE, handleGameMove);
        mySocket.on(SocketEvents.CARD_FROM_PILE, handleCardFromPile);
        mySocket.on(SocketEvents.TURN_PASSED, handleTurnPassed);
        mySocket.on(SocketEvents.TURN_CHANGED, handleTurnChanged);
        mySocket.on(SocketEvents.SUIT_CHANGED, handleSuitChanged);
        mySocket.on(SocketEvents.MESSAGE_SENT, handleMessageReceived);

        
        return () => {
            mySocket.off(SocketEvents.DISCONNECT, handleDisconnect);
            mySocket.off(SocketEvents.ROOM_CREATED, handleRoomCreated);
            mySocket.off(SocketEvents.MESSAGE, handleMessage);
            mySocket.off(SocketEvents.ROOM_PLAYERS, handleGamePlayersInfo);
            mySocket.off(SocketEvents.ROOM_LEFT, handleRoomLeft);
            mySocket.off(SocketEvents.GAME_STARTED, handleGameStarted);
            mySocket.off(SocketEvents.GAME_FINISHED, handleGameFinished);
            mySocket.off(SocketEvents.GAME_MOVE, handleGameMove);
            mySocket.off(SocketEvents.CARD_FROM_PILE, handleCardFromPile);
            mySocket.off(SocketEvents.TURN_PASSED, handleTurnPassed);
            mySocket.off(SocketEvents.TURN_CHANGED, handleTurnChanged);
            mySocket.off(SocketEvents.SUIT_CHANGED, handleSuitChanged);
            mySocket.off(SocketEvents.MESSAGE_SENT, handleMessageReceived);
        } 
    }, [mySocket, turn])

    return (
        <div className="container">
            <Nav />
            {
                room ? (
                    <WaitingRoom />
                ) : (
                    <>
                        <Registration />
                        <RoomForm />
                    </>       
                )
            }
        </div>
    )
};

export default Home;