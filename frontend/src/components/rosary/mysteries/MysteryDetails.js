import React from 'react';

const MysteryDetails = ({ selectedMysteryDetails, selectedMysteryIcon }) => {
    return (
        <div className="mystery-details-section">
            <ol className="mystery-details centered-list">
                {selectedMysteryDetails.map((detail, index) => (
                    <li key={index}>{detail}</li>
                ))}
            </ol>
            {selectedMysteryIcon && <img src={selectedMysteryIcon} alt="Selected Mystery" className="selected-mystery-icon" />}
        </div>
    );
};

export default MysteryDetails;
