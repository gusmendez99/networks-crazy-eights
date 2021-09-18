import React, { useEffect } from 'react';

import { Registration } from '../../components/Registration';
import { WaitingRoom } from '../../components/WaitingRoom';
import { RoomForm } from '../../components/RoomForm';
import { Nav } from '../../components/Nav';

import "./index.module.scss";
import { useRoom } from '../../hooks/useRoom';
import { SocketEvents } from '../../settings';
import { socket } from '../../sockets';
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
        setCurrentSuit, 
        setWinner } = useRoom();

    useEffect(() => {
        // TODO: place this functions inside /sockets folder
        const handleDisconnect = () => {
            // Reinitialize hook values
            setRoom(undefined);
            setPlayers([]);
            setIsOwner(false);
        }
        const handleMessage = (message) => console.log(message);
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
            updateMyHand([ ...game.myHand]);
            updateRivalsHand([...game.cardCount]);
            setMainCard(game.principalHeap.pop());
            setTurn(game.currentPlayer);
            setCurrentSuit(game.currentSuit);
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
            setTurn(currentPlayer);
            // updateRivalsHand(); not needed because in cardFromPile already updates rivalHands
        };

        const handleTurnChanged = ({ currentPlayer }) => {
            setTurn(currentPlayer);
        };

        const handleSuitChanged = ({ newSuit }) => {
            setCurrentSuit(newSuit);
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
        
        return () => {
            mySocket.off(SocketEvents.DISCONNECT, handleDisconnect);
            mySocket.off(SocketEvents.ROOM_CREATED, handleRoomCreated);
            mySocket.off(SocketEvents.MESSAGE, handleMessage);
            mySocket.off(SocketEvents.ROOM_PLAYERS, handleGamePlayersInfo);
            mySocket.off(SocketEvents.ROOM_LEFT, handleRoomLeft);
            mySocket.off(SocketEvents.GAME_START, handleGameStarted);
            mySocket.off(SocketEvents.GAME_FINISHED, handleGameFinished);
            mySocket.off(SocketEvents.GAME_MOVE, handleGameMove);

        } 
    }, [mySocket])

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