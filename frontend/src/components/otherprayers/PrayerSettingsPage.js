import React, { useState, useEffect } from 'react';
import { useAuth } from '../../api/authHook';
import { getPrayerSettings, updatePrayerSettings } from "../../api/user";
import PrayerSettings from '../../components/otherprayers/PrayerSettings';

const PrayerSettingsPage = () => {
    const [availablePrayers, setAvailablePrayers] = useState([]);

    const { user, token } = useAuth();
    const { _id } = user || {};
    const userId = _id;

    const fetchPrayerSettings = async () => {
        if (!userId) {
            console.error("User ID is not available.");
            return;
        }
        try {
            // console.log("UserID:", userId);
            // console.log("Token:", token);

            const settings = await getPrayerSettings(userId, token);

            // Log the fetched settings
            // console.log("Fetched Settings:", settings);

            if (settings.length === 0) {
                const defaultPrayerSettings = [
                    { id: 'rosary', name: 'Rosary', isVisible: true },
                    { id: 'mass', name: 'Mass', isVisible: true },
                    { id: 'confession', name: 'Confession', isVisible: true },
                    { id: 'divineMercy', name: 'Divine Mercy', isVisible: false },
                    { id: 'stMichaelPrayer', name: 'St. Michael Prayer', isVisible: false },
                    { id: 'stfrancis', name: 'St. Francis Prayer', isVisible: false },
                    { id: 'stleandroruiz', name: 'St. Leandro Ruiz Prayer', isVisible: false },
                ];
                await updatePrayerSettings(userId, defaultPrayerSettings, token);
                const updatedSettings = await getPrayerSettings(userId, token);
                setAvailablePrayers(updatedSettings);
                // console.log("Updated Settings after default set:", updatedSettings);
            } else {
                setAvailablePrayers(settings);
                // console.log("Updated Available Prayers after fetching:", settings);
            }
        } catch (error) {
            console.error("Error fetching prayer settings:", error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchPrayerSettings();
        }
    }, []);

    
    // const fetchPrayerSettings = async () => {
    //     try {
    //         const settings = await getPrayerSettings(userId, token);
    //         if (settings.length === 0) {
    //             await updatePrayerSettings(userId, defaultPrayerSettings, token);
    //             const updatedSettings = await getPrayerSettings(userId, token);
    //             setAvailablePrayers(updatedSettings);
    //         } else {
    //             setAvailablePrayers(settings);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching prayer settings:", error);
    //     }
    // };

    // useEffect(() => {
    //     fetchPrayerSettings();
    // }, []);

    // useEffect(() => {
    //     console.log("Updated Available Prayers in useEffect:", availablePrayers);
    // }, [availablePrayers]);

    const persistPrayerSettings = async (updatedPrayers) => {
        if (!userId) {
            console.error("User ID is not available.");
            return;
        }
        try {
            await updatePrayerSettings(userId, updatedPrayers, token);
        } catch (error) {
            console.error('Error updating prayer settings:', error);
        }
    };

    const handlePrayerVisibilityChange = (prayerId, isVisible) => {
        setAvailablePrayers(prevPrayers => {
            const updatedPrayers = prevPrayers.map(
                prayer => prayer.id === prayerId ? { ...prayer, isVisible } : prayer
            );
            persistPrayerSettings(updatedPrayers);
            return updatedPrayers;
        });
    };

    return (
        <div className="prayer-settings-page">
            <PrayerSettings availablePrayers={availablePrayers} onVisibilityChange={handlePrayerVisibilityChange} />
        </div>
    );
};

export default PrayerSettingsPage;
