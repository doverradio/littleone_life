import React from 'react';

const PrayerSettings = ({ availablePrayers, onVisibilityChange }) => {
    // Handle checkbox change to update prayer visibility
    const handleCheckboxChange = (prayerId, isChecked) => {
        onVisibilityChange(prayerId, isChecked);
    };

    console.log("Available Prayers in PrayerSettings:", availablePrayers);

    return (
        <div className="prayer-settings">
            <h2>Prayer Settings</h2>
            <p>Select the prayers you want to display on your dashboard:</p>
            <div className="prayer-list">
                {availablePrayers && availablePrayers.length > 0 ? (
                    availablePrayers.map(prayer => (
                        <div key={prayer.id} className="prayer-item">
                            <input 
                                type="checkbox" 
                                checked={prayer.isVisible} 
                                onChange={(e) => handleCheckboxChange(prayer.id, e.target.checked)} 
                            />&nbsp;&nbsp;
                            <label>{prayer.name}</label>
                        </div>
                    ))
                ) : (
                    <p>No prayers available.</p>
                )}
            </div>
        </div>
    );
};

PrayerSettings.defaultProps = {
    availablePrayers: [],
};

export default PrayerSettings;
