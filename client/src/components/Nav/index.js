import React from 'react';

import styles from './index.module.scss';
import logo from '../../assets/img/card-white.png'

export const Nav = () => (
    <div className={styles.container}>
            <img className={styles.logo} src={logo} alt="logo"/>
            <p className={styles.title} >Crazy-Eights</p>
    </div>
)

export default Nav;