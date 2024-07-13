import React from 'react';
import ToggleSlider from '../utils/ToggleSlider';

const MassSettings = ({ isEmailEnabled, handleEmailToggle }) => {
    return (
        <div>
            <div className="email-toggle">
                <ToggleSlider 
                    isEnabled={isEmailEnabled} 
                    toggleFunction={handleEmailToggle} 
                    componentName="Mass"
                    isDisabled={true} 
                />
            </div>
        </div>
    );
};

export default MassSettings;
