import React, { useState, useEffect } from 'react';
import { getUserSettings, updateUserSettings, getTokenUsage } from '../../api/user';
import { useAuth } from '../../api/authHook';
import { toast } from 'react-toastify';

import PersonalInfoForm from './PersonalInfoForm';
import LoginSettingsForm from './LoginSettingsForm';
import NotificationSettingsForm from './NotificationSettingsForm';
import PrayerSettingsForm from './PrayerSettingsForm';
import AiModelSettingsForm from './AiModelSettingsForm';

const Settings = () => {
    
    const { user, token } = useAuth();

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

    const [tokenUsage, setTokenUsage] = useState({ totalTokens: 0, totalCost: 0 });

    useEffect(() => {
        const fetchSettingsAndUsage = async () => {
            const result = await getUserSettings(token, user._id);
            const usage = await getTokenUsage(user._id, token);

            if (result.error) {
                toast.error(result.error);
            } else {
                setSettings({
                    ...settings,
                    ...result,
                    _id: user._id || '',
                });
                setTokenUsage(usage);
            }
        };

        fetchSettingsAndUsage();
    }, []);

    const handlePrayerSettingsChange = async (index, isVisible) => {
        const updatedPrayerSettings = [...settings.prayerSettings];
        updatedPrayerSettings[index].isVisible = isVisible;

        setSettings(prevSettings => ({
            ...prevSettings,
            prayerSettings: updatedPrayerSettings,
        }));

        // Send update to the backend
        try {
            const result = await updateUserSettings(token, { ...settings, prayerSettings: updatedPrayerSettings });
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success('Prayer settings updated successfully');
            }
        } catch (error) {
            toast.error('Failed to update settings');
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prevSettings => ({
            ...prevSettings,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('Submitting settings:', settings); // Log the settings being submitted
        
        const result = await updateUserSettings(token, settings); // Ensure `settings` includes the updated `prayerSettings`
        
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success('Settings updated successfully');
            console.log('Updated settings saved:', result); // Log the result from the backend
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
                <PrayerSettingsForm settings={settings} handlePrayerSettingsChange={handlePrayerSettingsChange} />
                <AiModelSettingsForm settings={settings} handleChange={handleChange} />
                
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
                        value={`$${((tokenUsage.totalCost * 2) / 100).toFixed(2)}`}
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
