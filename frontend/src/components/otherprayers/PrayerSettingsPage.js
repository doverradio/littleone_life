import React, { useState, useEffect } from 'react';
import { useAuth } from '../../api/authHook';
import { getPrayerSettings, updatePrayerSettings } from "../../api/user";
import PrayerSettings from '../../components/otherprayers/PrayerSettings';

const PrayerSettingsPage = () => {
    const [availablePrayers, setAvailablePrayers] = useState([]);
    const { user } = useAuth();
    const { _id: userId } = user || {};

    const fetchPrayerSettings = async () => {
        if (!userId) {
            console.error("User ID is not available.");
            return;
        }
        try {
            const settings = await getPrayerSettings(userId);

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
                await updatePrayerSettings(userId, defaultPrayerSettings);
                const updatedSettings = await getPrayerSettings(userId);
                setAvailablePrayers(updatedSettings);
            } else {
                setAvailablePrayers(settings);
            }
        } catch (error) {
            console.error("Error fetching prayer settings:", error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchPrayerSettings();
        }
    }, [userId]);

    const persistPrayerSettings = async (updatedPrayers) => {
        if (!userId) {
            console.error("User ID is not available.");
            return;
        }
        try {
            await updatePrayerSettings(userId, updatedPrayers);
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
