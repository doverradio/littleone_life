import React, { useState, useEffect } from 'react';
import { getUserSettings, updateUserSettings, getTokenUsage } from '../../api/user'; // Import getTokenUsage
import { isAuthenticated } from '../../api/auth';
import { toast } from 'react-toastify';

import PersonalInfoForm from './PersonalInfoForm';
import LoginSettingsForm from './LoginSettingsForm';
import NotificationSettingsForm from './NotificationSettingsForm';
import PrayerSettingsForm from './PrayerSettingsForm';
import AiModelSettingsForm from './AiModelSettingsForm';

const Settings = () => {
    const [settings, setSettings] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        role: '',
        preferredLoginType: 'username-password',
        allowInstantPrayerArmy: false,
        allowNotifications: false,
        autoSendPrayerGroupRequest: false,
        aiModel: 'gpt-3.5-turbo',
        username: '',
        password: '',
        _id: '',
        prayerSettings: []
    });

    const [tokenUsage, setTokenUsage] = useState({ totalTokens: 0, totalCost: 0 }); // New state for token usage

    useEffect(() => {
        const fetchSettingsAndUsage = async () => {
            const { token, user } = isAuthenticated();
            const result = await getUserSettings(token, user._id);
            const usage = await getTokenUsage(user._id, token); // Fetch token usage and cost

            if (result.error) {
                toast.error(result.error);
            } else {
                setSettings({
                    ...settings,
                    ...result,
                    _id: user._id || '',
                });
                setTokenUsage(usage); // Set the token usage and cost
            }
        };

        fetchSettingsAndUsage();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [fieldName, index, subField] = name.split('.');
    
        if (fieldName === 'prayerSettings') {
            const newSettings = [...settings.prayerSettings];
            newSettings[index] = { ...newSettings[index], [subField]: value };
    
            setSettings(prevSettings => ({
                ...prevSettings,
                prayerSettings: newSettings,
            }));
        } else {
            setSettings(prevSettings => ({
                ...prevSettings,
                [name]: value
            }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { token } = isAuthenticated();
        const result = await updateUserSettings(token, settings); // Ensure `settings` includes the updated `prayerSettings`
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success('Settings updated successfully');
            setSettings(result);
        }
    };

    return (
        <div className="container" style={{ minHeight: '80vh' }}>
            <h2>Settings</h2>
            <form onSubmit={handleSubmit}>
                <PersonalInfoForm settings={settings} handleChange={handleChange} />
                <LoginSettingsForm settings={settings} handleChange={handleChange} />
                <NotificationSettingsForm settings={settings} handleChange={handleChange} />
                <PrayerSettingsForm settings={settings} handleChange={handleChange} />
                <AiModelSettingsForm settings={settings} handleChange={handleChange} />
                
                {/* Display the token usage and cost */}
                <div className="form-group">
                    <label>Total Token Usage:</label>
                    <input
                        type="text"
                        value={tokenUsage.totalTokens}
                        readOnly
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Total Cost:</label>
                    <input
                        type="text"
                        value={`$${((tokenUsage.totalCost * 2) / 100).toFixed(2)}`} // assuming cost is stored in cents and doubling the cost
                        readOnly
                        className="form-control"
                    />
                </div>


                <button type="submit" className="btn btn-primary">Save Settings</button>
            </form>
        </div>
    );
};

export default Settings;
