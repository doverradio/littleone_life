import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";  // Correct import statement
import { getCookie } from '../helpers/cookieHelper'; // Adjust the import based on your folder structure
import { getPrayerSettings } from '../api/user'; // Import the getPrayerSettings function

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [prayerSettings, setPrayerSettings] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUser({ ...decoded, token });

            const fetchPrayerSettings = async () => {
                try {
                    const settings = await getPrayerSettings(decoded._id, token);
                    setPrayerSettings(settings);
                } catch (error) {
                    console.error('Error fetching prayer settings:', error);
                } finally {
                    setLoading(false); // Set loading to false after fetching settings
                }
            };

            fetchPrayerSettings();
        } else {
            setLoading(false); // Set loading to false if no token is found
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, prayerSettings, setPrayerSettings, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
