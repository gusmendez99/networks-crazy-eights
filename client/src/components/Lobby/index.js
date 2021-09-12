import React from "react";

import { RoomList } from '../RoomList';

export const Lobby = ({ isWithin = false }) => {

   const availableRooms = [
       {id: 'fea0fi3', name: 'Game1', players: 2, host: 'test'},
       {id: 'f03feaf', name: 'Game2', players: 3, host: 'test'},
       {id: 'tporj22', name: 'Game3', players: 5, host: 'test'},
    ] 

    const createNewRoom = () => {
        console.log("Create room");
    }

    return(
        <div>
            <h1>Lobby</h1>
            {
                (availableRooms.length > 0 && !isWithin) ?
                <RoomList roomList={availableRooms}/> :
                <p>Could not find any room</p>
            }
            {
                !isWithin && 
                <button onClick={createNewRoom}>Create Room</button>
            } 
    
        </div>
    );
};

export default Lobby;

