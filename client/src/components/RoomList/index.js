import React from 'react';

import { RoomItem } from '../RoomItem';

import styles from './index.module.scss';

export const RoomList = ({ roomList }) => {

    return(
        <div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.row}>Room Name</th>
                        <th className={styles.row}>Players</th>
                        <th className={styles.row}>Host</th>
                        <th className={styles.row}></th>
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