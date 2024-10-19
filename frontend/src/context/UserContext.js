import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";  // Importing jwtDecode as a named export
import { getCookie } from '../helpers/cookieHelper';
import { getPrayerSettings } from '../api/user';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userPreferences, setUserPreferences] = useState({
        prayerSettings: [],
        gender: '', // Add other preferences like gender
        novenas: [], // Store novena selections as an array
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUser({ ...decoded, token });

            const fetchUserPreferences = async () => {
                try {
                    // Fetch prayer settings or any other settings from the server
                    const settings = await getPrayerSettings(decoded._id, token);
                    setUserPreferences((prevPreferences) => ({
                        ...prevPreferences,
                        prayerSettings: settings, // Update prayerSettings in userPreferences
                    }));
                } catch (error) {
                    console.error('Error fetching prayer settings:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchUserPreferences();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, userPreferences, setUserPreferences, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
