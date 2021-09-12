import React from 'react';

import { RoomItem } from '../RoomItem';

export const RoomList = ({ roomList }) => {

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Room Name</th>
                        <th>Players</th>
                        <th>Host</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    roomList.map(room => (
                        <RoomItem room={room} />
                    ))
                    }
                </tbody>
            </table>

        </div>
    );
};

export default RoomList;