// src/context/ModalContext.js
import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalState, setModalState] = useState({
        rosary: false,
        mass: false,
        confession: false,
        divineMercyChaplet: false,
    });

    const toggleModal = (id) => {
        setModalState(prevState => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    return (
        <ModalContext.Provider value={{ modalState, toggleModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);
