import React from 'react';

import { Registration } from '../../components/Registration';
import { Lobby } from '../../components/Lobby';
import { RoomForm } from '../../components/RoomForm';

import "./index.module.scss";

export const Home = () => {
    return (
        <div className="container">
            <Registration />
            <Lobby />
            <RoomForm />
        </div>
        
    )
};

export default Home;