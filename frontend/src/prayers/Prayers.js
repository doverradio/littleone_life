import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../api/auth";
import { getPrayerSettings, updatePrayerSettings } from "../api/user";
import { useUser } from '../context/UserContext';
import prayerSettingsIcon from '../components/otherprayers/prayersettings_icon.png';
import stLeandroRuizIcon from '../components/otherprayers/stleandroruiz/stleandroruiz_icon.png';
import stFrancisIcon from '../components/otherprayers/stfrancis/stfrancis_icon.png';
import stMichaelIcon from '../components/otherprayers/stmichaelprayer/stmichael_icon.png';
import divineMercyIcon from '../components/otherprayers/divinemercy/divinemercy_icon.png';
import confessionIcon from '../components/confession/confession_icon.png';
import massIcon from '../components/mass/mass_icon.png';
import rosaryIcon from '../components/rosary/rosary_icon.png';

import "./Prayers.css"; // Ensure you have this CSS file

const Prayers = () => {
    const { user } = useUser(); // Access user from UserContext
    const {
        user: { firstName, _id: userId },
        token
    } = isAuthenticated();
    
    const [availablePrayers, setAvailablePrayers] = useState([]);

    const defaultPrayerSettings = [
        { id: 'rosary', name: 'Rosary', isVisible: true },
        { id: 'mass', name: 'Mass', isVisible: true },
        { id: 'confession', name: 'Confession', isVisible: true },
        { id: 'divineMercy', name: 'Divine Mercy', isVisible: false },
        { id: 'stMichaelPrayer', name: 'St. Michael Prayer', isVisible: false },
        { id: 'stfrancis', name: 'St. Francis Prayer', isVisible: false },
        { id: 'stleandroruiz', name: 'St. Leandro Ruiz Prayer', isVisible: false },
    ];

    const [icons, setIcons] = useState([
        { id: 'rosary', name: 'Rosary', icon: rosaryIcon, route: '/prayers/rosary' },
        { id: 'mass', name: 'Mass', icon: massIcon, route: '/prayers/mass' },
        { id: 'confession', name: 'Confession', icon: confessionIcon, route: '/prayers/confession' },
        { id: 'divineMercy', name: 'Divine Mercy', icon: divineMercyIcon, route: '/prayers/divinemercy' },
        { id: 'stMichaelPrayer', name: 'St. Michael Prayer', icon: stMichaelIcon, route: '/prayers/stmichael' },
        { id: 'stfrancis', name: 'St. Francis Prayer', icon: stFrancisIcon, route: '/prayers/stfrancis' },
        { id: 'stleandroruiz', name: 'St. Leandro Ruiz Prayer', icon: stLeandroRuizIcon, route: '/prayers/stleandroruiz' },
        { 
            id: 'prayerSettings', 
            name: 'Prayer Settings',
            icon: prayerSettingsIcon, 
            route: '/prayers/settings'
        },
    ]);
    
    const fetchPrayerSettings = async () => {
        try {
            const settings = await getPrayerSettings(userId, token);
            if (settings.length === 0) {
                await updatePrayerSettings(userId, defaultPrayerSettings, token);
                const updatedSettings = await getPrayerSettings(userId, token);
                setAvailablePrayers(updatedSettings);
            } else {
                setAvailablePrayers(settings);
            }
        } catch (error) {
            console.error("Error fetching prayer settings:", error);
        }
    };

    useEffect(() => {
        fetchPrayerSettings();
    }, []);

    const persistPrayerSettings = async (updatedPrayers) => {
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
        <div className="prayers-container">
            <div className="prayers-content">
                <div className="row justify-content-center align-items-center">
                    {
                        firstName ?
                        <><h2 className="header-font mt-2">{firstName}'s Prayers</h2></>
                        : <><h2 className="header-font mt-2">My Prayers</h2></>
                    }
                </div>
                <div className="prayer-icons">
                    {icons.map(icon => (
                        <Link to={icon.route} key={icon.id}>
                            <div className="prayer-icon">
                                <img src={icon.icon} alt={icon.name} />
                                <p>{icon.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Prayers;
