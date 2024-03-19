import React, { useState } from 'react';
import './VirtualRosary.css'; // Assuming you have a CSS file for styles

const VirtualRosary = ({ selectedMystery }) => {
    const [currentBead, setCurrentBead] = useState(0);
    const totalBeads = 10; // Example, adjust based on the actual number of beads

    const handleNextBead = () => {
        setCurrentBead((prevBead) => (prevBead + 1) % totalBeads);
    };

    const handlePreviousBead = () => {
        setCurrentBead((prevBead) => (prevBead - 1 + totalBeads) % totalBeads);
    };

    return (
        <div className="virtual-rosary">
            <div className="rosary-info">
                <h2>{selectedMystery}</h2>
                <p>Current Bead: {currentBead + 1}</p>
            </div>
            <div className="rosary-beads">
                {[...Array(totalBeads)].map((_, index) => (
                    <div
                        key={index}
                        className={`bead ${index === currentBead ? 'active-bead' : ''}`}
                    ></div>
                ))}
            </div>
            <div className="rosary-controls">
                <button onClick={handlePreviousBead}>Previous</button>
                <button onClick={handleNextBead}>Next</button>
            </div>
        </div>
    );
};

export default VirtualRosary;
