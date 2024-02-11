import React, { useState } from 'react';
import rosaryIcon from './rosary_icon.png'; // Adjust the path to where your icon is stored
import luminousImage from './luminous.jpg';
import sorrowfulImage from './sorrowful.jpg';
import gloriousImage from './glorious.jpg';
import joyfulImage from './joyful.jpg';
import './styles.css'

// Define the Rosary component
const Rosary = () => {
    // State to keep track of the number of rosaries prayed
    const [count, setCount] = useState(0);
    const [selectedMystery, setSelectedMystery] = useState('Luminous');
    const [prayerIntentions, setPrayerIntentions] = useState([]);

    // Define the mysteries and their associated images
    const mysteries = [
        { name: 'Luminous', image: luminousImage },
        { name: 'Sorrowful', image: sorrowfulImage },
        { name: 'Glorious', image: gloriousImage },
        { name: 'Joyful', image: joyfulImage }
    ];
    
    const handleMysteryChange = (event) => {
        setSelectedMystery(event.target.value);
    };

    const addPrayerIntention = () => {
        // This could prompt the user for input or open another component/modal
        // For now, we'll just add a default intention
        setPrayerIntentions([...prayerIntentions, 'New Intention']);
    };

    // Function to handle the increment of the rosary count
    const handlePrayRosary = () => {
        setCount(prevCount => prevCount + 1);
        // Here, you would also handle the persistence of this action, e.g., saving to a database
    };

    
    const handleMysteryDivClick = (mysteryName) => {
        setSelectedMystery(mysteryName);
    };
    
    const handleMysteryClick = (mysteryName) => {
        setSelectedMystery(mysteryName);
    };

    // Render the component
    return (
        <div className="rosary-component">
            <div className="row">
                <div className="col-3">
                    <img 
                        src={rosaryIcon} 
                        alt="Rosary" 
                        className="rosary-icon" 
                        style={{
                            height: '55px',
                            width: '55px',
                            cursor: 'pointer'
                        }}
                    />
                </div>
                <div className="col-9">
                    <h1 className="m-1">
                        Rosary
                    </h1>
                </div>
            </div>
            <hr />
            
            <h2 className='text-center fancy-font'>{selectedMystery ? selectedMystery : 'Select Mystery'}</h2>

            <div className="mysteries-row" style={{ 
                display: 'flex', 
                justifyContent: 'space-around', // Adjust to 'space-around' for better spacing
                flexWrap: 'nowrap', // Prevent wrapping
            }}>
                {mysteries.map((mystery, index) => (
                    <div 
                        key={index}
                        onClick={() => handleMysteryClick(mystery.name)}
                        style={{ 
                            cursor: 'pointer',
                            border: selectedMystery === mystery.name ? '2px solid blue' : 'none',
                            textAlign: 'center',
                            margin: '5px',
                            flex: '1 0 20%', // Adjust the flex grow, shrink, and basis
                            borderRadius: '15%'
                        }}
                    >
                        <img 
                            src={mystery.image} 
                            alt={mystery.name} 
                            style={{ height: '50px', width: '50px', borderRadius: '15%' }}
                        />
                        <p className="fancy-font">{mystery.name}</p>
                    </div>
                ))}
            </div>
            <hr />
            <h2>Prayer Intentions</h2>
            {prayerIntentions.length > 0 ? (
                <ul>
                    {prayerIntentions.map((intention, index) => (
                        <li key={index}>{intention}</li>
                    ))}
                </ul>
            ) : (
                <>
                    <p>No intentions added yet.</p>
                    <button className="btn btn-outline-secondary btn-sm">
                        Add intention
                    </button>
                </>
            )}
            <hr />
            <button 
                onClick={handlePrayRosary} 
                className="pray-rosary-btn btn btn-primary btn-sm"
            >
                Submit
            </button>
            <p>You have prayed {count} rosaries.</p>
        </div>
    );
};

export default Rosary;