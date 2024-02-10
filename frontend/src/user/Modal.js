import React from "react";
import './styles.css'

const Modal = ({ show, onHide, children }) => {
    if (!show) {
        return null;
    }

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