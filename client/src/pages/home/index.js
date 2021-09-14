import React from 'react';

import { Registration } from '../../components/Registration';
import { Lobby } from '../../components/Lobby';
import { RoomForm } from '../../components/RoomForm';
import { Nav } from '../../components/Nav';

import "./index.module.scss";

export const Home = () => {
    return (
        <div className="container">
            <Nav />
            <Registration />
        </div>
        
    )
};

export default Home;