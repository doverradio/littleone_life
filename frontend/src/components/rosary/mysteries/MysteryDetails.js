// src/components/rosary/mysteries/MysteryDetails.js

import React from 'react';
import './MysteriesCard.css'; // CSS for styling

const MysteryDetails = ({ selectedMysteryDetails }) => {
    return (
        <div className="mystery-details-card">
            <ul className="mysteries-list">
                {selectedMysteryDetails.map((detail, index) => (
                    <li key={index} className="mystery-item larger-text left-align spaced">
                        {index + 1}. {detail}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MysteryDetails;
