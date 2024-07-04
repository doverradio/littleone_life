// PrayerButton.js
import React, { useState } from 'react';
// import Modal from './Modal';

const PrayerButton = ({ prayerType }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleCreateRequest = () => {
        // Logic to create prayer request
        console.log(`Creating prayer request for ${prayerType}`);
        handleClose();
    };

    return (
        <>
            <button onClick={handleShow} className="btn btn-primary">
                Start Instant Prayer Army
            </button>

            {/* <Modal show={showModal} handleClose={handleClose} title={`Create ${prayerType} Prayer Request`}>
                <p>Configure your {prayerType} prayer request...</p>
                <div className="modal-footer">
                    <button onClick={handleClose} className="btn">Close</button>
                    <button onClick={handleCreateRequest} className="btn btn-primary">Create Request</button>
                </div>
            </Modal> */}
        </>
    );
};

export default PrayerButton;
