import React  from "react";

export const RoomItem = ({ room }) => {
    
    const joinGame = () => {
        console.log(room.id);
    }

    return(
        <tr>
            <td>{room.roomName}</td>
            <td>{room.players}</td>
            <td>{room.host}</td>
            <td><button onClick={joinGame}>Join Game</button></td>
        </tr>
    );
};

export default RoomItem;