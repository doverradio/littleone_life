import React from 'react';
import luminousImage from '../luminous.jpg';
import sorrowfulImage from '../sorrowful.jpg';
import gloriousImage from '../glorious.jpg';
import joyfulImage from '../joyful.jpg';
import './MysteriesCard.css'; // Import the new CSS file

export const mysteries = [
    { name: 'Luminous', image: luminousImage },
    { name: 'Sorrowful', image: sorrowfulImage },
    { name: 'Glorious', image: gloriousImage },
    { name: 'Joyful', image: joyfulImage }
];

const Mysteries = ({ handleMysteryClick }) => {
    return (
        <div className="mysteries-card">
            <div className="mysteries-row">
                {mysteries.map((mystery, index) => (
                    <div key={index} onClick={() => handleMysteryClick(mystery.name)} className="mystery-item">
                        <img src={mystery.image} alt={mystery.name} className="mystery-image" />
                        <p>{mystery.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MysteryDetails = ({ selectedMysteryDetails }) => {
    return (
        <div className="mysteries-card">
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

export default Mysteries;
export { MysteryDetails };
