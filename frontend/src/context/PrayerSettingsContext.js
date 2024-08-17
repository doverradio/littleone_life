import React, { createContext, useState, useEffect, useContext } from 'react';
import { getPrayerSettings } from '../api/user';
import { useAuth } from '../api/authHook';

const PrayerSettingsContext = createContext();

export const usePrayerSettings = () => useContext(PrayerSettingsContext);

export const PrayerSettingsProvider = ({ children }) => {
    
    const { user, token } = useAuth();
    const [prayerSettings, setPrayerSettings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const settings = await getPrayerSettings(user._id, token);
                setPrayerSettings(settings);
            } catch (error) {
                console.error('Error fetching prayer settings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const updatePrayerSettings = (newSettings) => {
        setPrayerSettings(newSettings);
    };

    return (
        <PrayerSettingsContext.Provider value={{ prayerSettings, updatePrayerSettings, loading }}>
            {children}
        </PrayerSettingsContext.Provider>
    );
};
