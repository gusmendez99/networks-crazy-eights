import React from  'react';

import styles from './index.module.scss';


const Modal = ({ show, children }) => {

    return (
        <div className={show ? styles.show : styles.hide }>
            <section className={styles.modalMain}>
                {children}
            </section>
        </div>
    );
}

export default Modal;