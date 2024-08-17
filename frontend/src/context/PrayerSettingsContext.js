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
            if (user && user._id && token) { // Ensure user and token are valid before making the request
                try {
                    const settings = await getPrayerSettings(user._id, token);
                    setPrayerSettings(settings);
                } catch (error) {
                    console.error('Error fetching prayer settings:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false); // If no valid user or token, stop loading
            }
        };

        fetchSettings(); // Trigger the fetchSettings only if user and token are present
    }, [user?._id, token]); // Adding specific dependencies to prevent unnecessary re-renders

    const updatePrayerSettings = (newSettings) => {
        setPrayerSettings(newSettings);
    };

    return (
        <PrayerSettingsContext.Provider value={{ prayerSettings, updatePrayerSettings, loading }}>
            {children}
        </PrayerSettingsContext.Provider>
    );
};
