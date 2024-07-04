// Modal.js
import React from 'react';
// import './Modal.css'; // Import the CSS for the modal

const Modal = ({ show, handleClose, children, title }) => {
    return (
        <div className={`modal ${show ? 'modal-show' : ''}`}>
            <div className="modal-content">
                <div className="modal-header">
                    <h4>{title}</h4>
                    <button onClick={handleClose} className="close-button">&times;</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                {/* <div className="modal-footer">
                    <button onClick={handleClose} className="btn">Close</button>
                </div> */}
            </div>
        </div>
    );
};

export default Modal;
