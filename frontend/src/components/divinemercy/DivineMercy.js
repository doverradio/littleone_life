import React, { useState, useEffect } from 'react';
// import { getAllIntentions, createIntention, updateIntention, deleteIntention } from '../../api/intentions';
// import { createMassAttendance, countMassesByUser } from '../../api/massAttendance'; 
import { isAuthenticated } from '../../api/auth';
import { MdOutlineModeEdit } from "react-icons/md";
import divineMercyIcon from './divinemercy_icon.png'; // Adjust the path to where your icon is stored

const DivineMercy = () => {
    // State to keep track of the number of chaplets prayed
    const [count, setCount] = useState(0);
    const [prayerIntentions, setPrayerIntentions] = useState([]);

    const {
        user: { _id }
    } = isAuthenticated();

    const userId = _id;
    
    const addPrayerIntention = () => {
        // This could prompt the user for input or open another component/modal
        // For now, we'll just add a default intention
        setPrayerIntentions([...prayerIntentions, 'New Intention']);
    };

    // Function to handle the increment of the chaplet count
    const handlePrayChaplet = () => {
        setCount(prevCount => prevCount + 1);
        // Here, you would also handle the persistence of this action, e.g., saving to a database
    };

    return (
        <div className="divine-mercy-component">
            <img 
                src={divineMercyIcon} 
                alt="Divine Mercy Chaplet" 
                className="divine-mercy-icon" 
                style={{ height: '55px', width: '55px', cursor: 'pointer' }}
            />
            
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
                    <button className="btn btn-outline-secondary btn-sm" onClick={addPrayerIntention}>
                        Add intention
                    </button>
                </>
            )}

            <button 
                onClick={handlePrayChaplet} 
                className="pray-chaplet-btn btn btn-primary btn-sm"
            >
                Submit
            </button>
            <p>You have prayed {count} Divine Mercy Chaplets.</p>
        </div>
    );
};

export default DivineMercy;
