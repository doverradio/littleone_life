import React, { createContext, useState, useEffect, useContext } from 'react';
import { getPrayerSettings } from '../api/user';
import { useAuth } from '../api/authHook';

const PrayerSettingsContext = createContext();

export const usePrayerSettings = () => useContext(PrayerSettingsContext);

export const PrayerSettingsProvider = ({ children }) => {
    const { user } = useAuth();
    const [prayerSettings, setPrayerSettings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            if (user && user._id) { // Ensure user is valid before making the request
                try {
                    const settings = await getPrayerSettings(user._id);
                    // console.log('Fetched Prayer Settings:', settings); // Log the settings
                    setPrayerSettings(settings);
                } catch (error) {
                    console.error('Error fetching prayer settings:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false); // If no valid user, stop loading
            }
        };

        fetchSettings(); // Trigger the fetchSettings only if user is present
    }, [user?._id]); // Adding specific dependencies to prevent unnecessary re-renders

    const updatePrayerSettings = (newSettings) => {
        setPrayerSettings(newSettings);
    };

    return (
        <PrayerSettingsContext.Provider value={{ prayerSettings, updatePrayerSettings, loading }}>
            {children}
        </PrayerSettingsContext.Provider>
    );
};
