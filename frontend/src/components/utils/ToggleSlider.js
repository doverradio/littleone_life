import React, { useEffect, useState } from 'react';
import './styles.css';
import { toggleNotification } from '../../api/notification';

const ToggleSlider = ({ 
  initialIsEnabled,  // Received initial state from parent
  componentName, 
  userId
}) => {
    const [isEnabled, setIsEnabled] = useState(initialIsEnabled);

    useEffect(() => {
        setIsEnabled(initialIsEnabled);
    }, [initialIsEnabled]);

    const handleToggle = async () => {
        try {
            const updatedStatus = await toggleNotification(userId, componentName);
            setIsEnabled(prevState => !prevState);  // Flip the state locally
        } catch (error) {
            console.error('Failed to toggle notification:', error);
        }
    };

    return (
        <div className="toggle-slider-container">
            <label className="switch">
                <input 
                    type="checkbox" 
                    checked={isEnabled} 
                    onChange={handleToggle} 
                />
                <span className="slider round"></span>
            </label>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="toggle-label">Email Notification Per Submitted {componentName}</span>
        </div>
    );
};

export default ToggleSlider;
