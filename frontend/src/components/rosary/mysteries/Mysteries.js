// src/components/rosary/mysteries/Mysteries.js

import React, { useState } from 'react';
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
    const [selectedMystery, setSelectedMystery] = useState('');

    const handleClick = (mysteryName) => {
        setSelectedMystery(mysteryName);
        handleMysteryClick(mysteryName);
    };

    return (
        <div className="mysteries-card">
            <div className="mysteries-row">
                {mysteries.map((mystery, index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(mystery.name)}
                        className={`mystery-item ${selectedMystery === mystery.name ? 'selected-mystery' : ''}`}
                    >
                        <img src={mystery.image} alt={mystery.name} className="mystery-image" />
                        <p className='mt-2'>{mystery.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Mysteries;
