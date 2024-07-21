import React from 'react';
import './MysteriesCard.css'; // Import the new CSS file

const MysteryDetails = ({ selectedMysteryDetails }) => {
    return (
        <div className="mystery-details-card">
            <ul className="mysteries-list">
                {selectedMysteryDetails.map((detail, index) => (
                    <li key={index} className="mystery-item">
                        {index + 1}. {detail}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MysteryDetails;
