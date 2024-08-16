import React from 'react';

const NotificationSettingsForm = ({ settings, handleChange }) => (
    <div className="form-group">
        <label>Receive Notifications:</label>
        <div>
            <label>
                <input 
                    type="checkbox" 
                    name="allowInstantPrayerArmy" 
                    checked={settings.allowInstantPrayerArmy} 
                    onChange={handleChange}
                /> Allow instant prayer army
            </label>
            <label className="ml-3">
                <input 
                    type="checkbox" 
                    name="allowNotifications" 
                    checked={settings.allowNotifications} 
                    onChange={handleChange}
                /> Allow notifications
            </label>
            <label className="ml-3">
                <input 
                    type="checkbox" 
                    name="autoSendPrayerGroupRequest" 
                    checked={settings.autoSendPrayerGroupRequest} 
                    onChange={handleChange}
                /> Automatically send prayer group request
            </label>
        </div>
    </div>
);

export default NotificationSettingsForm;
