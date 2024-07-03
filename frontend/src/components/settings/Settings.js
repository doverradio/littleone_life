import React, { useState, useEffect } from 'react';
import NavbarMain from '../../NavbarMain';
import Footer from '../../Footer';
import { getUserSettings, updateUserSettings } from '../../api/user';
import { isAuthenticated } from '../../api/auth';
import { toast } from 'react-toastify';

const Settings = () => {
    const [settings, setSettings] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        preferredLoginType: 'username-password',
        allowInstantPrayerArmy: false,
        allowNotifications: false,
        autoSendPrayerGroupRequest: false,
        username: '',
        password: ''
    });

    useEffect(() => {
        const fetchSettings = async () => {
            const { token, user } = isAuthenticated();
            const result = await getUserSettings(token, user._id);
            if (result.error) {
                toast.error(result.error);
            } else {
                setSettings({
                    ...settings,
                    firstName: result.firstName || '',
                    lastName: result.lastName || '',
                    phoneNumber: result.phone || '',
                    preferredLoginType: result.googleId ? 'google' : 'username-password',
                    allowInstantPrayerArmy: result.allowInstantPrayerArmy || false,
                    allowNotifications: result.allowNotifications || false,
                    autoSendPrayerGroupRequest: result.autoSendPrayerGroupRequest || false,
                    username: result.username || '',
                });
            }
        };

        fetchSettings();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prevSettings => ({
            ...prevSettings,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { token } = isAuthenticated();
        const result = await updateUserSettings(token, settings);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success('Settings updated successfully');
            setSettings(result);
        }
    };

    return (
        <>
            <NavbarMain />
            <div className="container" style={{ minHeight: '80vh' }}>
                <h2>Settings</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>First Name:</label>
                        <input 
                            type="text" 
                            name="firstName" 
                            value={settings.firstName} 
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name:</label>
                        <input 
                            type="text" 
                            name="lastName" 
                            value={settings.lastName} 
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input 
                            type="text" 
                            name="phoneNumber" 
                            value={settings.phoneNumber} 
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Preferred Login Type:</label>
                        <div>
                            <label>
                                <input 
                                    type="radio" 
                                    name="preferredLoginType" 
                                    value="username-password" 
                                    checked={settings.preferredLoginType === 'username-password'} 
                                    onChange={handleChange}
                                /> Username/Password
                            </label>
                            <label className="ml-3">
                                <input 
                                    type="radio" 
                                    name="preferredLoginType" 
                                    value="google" 
                                    checked={settings.preferredLoginType === 'google'} 
                                    onChange={handleChange}
                                /> Google Account
                            </label>
                        </div>
                    </div>
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
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Send Notifications:</label>
                        <div>
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="autoSendPrayerGroupRequest" 
                                    checked={settings.autoSendPrayerGroupRequest} 
                                    onChange={handleChange}
                                /> Automatically send prayer group request upon clicking button
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Change Username:</label>
                        <input 
                            type="text" 
                            name="username" 
                            value={settings.username} 
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Change Password:</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={settings.password} 
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Save Settings</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Settings;
