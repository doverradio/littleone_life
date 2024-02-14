import React from "react";
import { useModal } from "../context/ModalContext";
import './styles.css'

const Modal = ({ id, children }) => {
    const { modalState, toggleModal } = useModal();
    
    const show = modalState[id];

    if (!show) {
        return null;
    }

    const onHide = () => toggleModal(id);

    return (
        <div className="modal" onClick={onHide}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span className="close" onClick={onHide}>&times;</span>
                {children}
            </div>
        </div>
    );
};

export default Modal