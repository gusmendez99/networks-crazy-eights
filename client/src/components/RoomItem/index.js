import React  from "react";

import styles from './index.module.scss';

export const RoomItem = ({ room }) => {
    
    const joinGame = () => {
        console.log(room.id);
    }

    return(
        <tr>
            <td className={styles.row}>{room.name}</td>
            <td className={styles.row}>{room.players}</td>
            <td className={styles.row}>{room.host}</td>
            <td className={styles.row}><button classname={styles.joinGame} onClick={joinGame}>Join Game &raquo;</button></td>
        </tr>
    );
};

export default RoomItem;