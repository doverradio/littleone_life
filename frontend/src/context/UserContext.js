// src/context/UserContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";  // Importing jwtDecode as a named export
import { getCookie } from '../helpers/cookieHelper';
import { getPrayerSettings } from '../api/user';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [prayerSettings, setPrayerSettings] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    setLoading(false);
                }
            };

            fetchPrayerSettings();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, prayerSettings, setPrayerSettings, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
