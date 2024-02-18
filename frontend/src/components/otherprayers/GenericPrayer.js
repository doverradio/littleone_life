// GenericPrayer.js
import React from 'react';
// import { createPrayerSession } from '../../api/prayerSessions'; // API to save prayer session
const log = console.log;

const GenericPrayer = ({ prayerTitle, prayerText, iconSrc }) => {
    // ... State and other hooks

    const handleSubmitPrayer = async () => {
        // Logic to handle submission of the prayer session
        const prayerData = {
            // ... Data to be sent to backend
        };
        try {
            // await createPrayerSession(prayerData);
            log(`Clicked handleSubmitPrayer!`)
            // Handle success
        } catch (error) {
            log(`handleSubmitPrayer error: `, error)
        }
    };

    return (
        <div className="generic-prayer-container">
            <img 
                src={iconSrc} 
                alt={prayerTitle} 
                className="prayer-icon"
                style={{
                    height: '220px',
                    width: '220px'
                }}
            />
            <h1>{prayerTitle}</h1>
            <p>{prayerText}</p>
            <button 
                onClick={handleSubmitPrayer}
                className='btn btn-primary btn-block m-1'
            >
                Submit Prayer
            </button>
        </div>
    );
};

export default GenericPrayer;
