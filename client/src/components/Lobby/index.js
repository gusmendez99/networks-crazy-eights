import React from "react";

import { RoomList } from '../RoomList';

import styles from './index.module.scss';

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
        <div className={styles.container}>
            <div className={styles.lobby}>
                <h1>Lobby</h1>
                {
                    !isWithin ? (
                        (availableRooms.length > 0) ?
                        <RoomList roomList={availableRooms}/> :
                        <p>Could not find any room</p>
                    ) : <p>Waiting for the host to start ...</p>
                } 
                {
                    !isWithin && 
                    <button className={styles.btn} onClick={createNewRoom}>Create Room</button>
                } 
            </div>
        </div>
    );
};

export default Lobby;

