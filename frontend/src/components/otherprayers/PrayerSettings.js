import React, { useState, useEffect } from 'react';

const PrayerSettings = ({ availablePrayers, onVisibilityChange }) => {
    // Assuming 'availablePrayers' is an array of objects containing { id, name, isVisible }

    // Handle checkbox change to update prayer visibility
    const handleCheckboxChange = (prayerId, isChecked) => {
        onVisibilityChange(prayerId, isChecked);
    };


    return (
        <div className="prayer-settings">
            <h2>Prayer Settings</h2>
            <p>Select the prayers you want to display on your dashboard:</p>
            <div className="prayer-list">
                {availablePrayers.map(prayer => (
                    <div key={prayer.id} className="prayer-item">
                        <input 
                            type="checkbox" 
                            checked={prayer.isVisible} 
                            onChange={(e) => handleCheckboxChange(prayer.id, e.target.checked)} 
                        />&nbsp;&nbsp;
                        <label>{prayer.name}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrayerSettings;
