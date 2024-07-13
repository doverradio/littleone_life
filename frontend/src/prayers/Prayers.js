import React, { useState, useEffect } from "react";
import { useModal } from "../context/ModalContext";
import { isAuthenticated } from "../api/auth";
import { getPrayerSettings, updatePrayerSettings } from "../api/user";
import { useUser } from '../context/UserContext';
import PrayerIcons from "../user/dashboard/PrayerIcons"; // Adjust path if necessary
import prayerSettingsIcon from '../components/otherprayers/prayersettings_icon.png';
import PrayerSettingsModal from "../user/dashboard/PrayerSettingsModal"; // Adjust path if necessary
import PrayerSettings from "../components/otherprayers/PrayerSettings";
import StLeandroRuizPrayer from "../components/otherprayers/stleandroruiz/StLeandroRuiz";
import stLeandroRuizIcon from '../components/otherprayers/stleandroruiz/stleandroruiz_icon.png';
import StFrancisPrayer from "../components/otherprayers/stfrancis/StFrancisPrayer";
import stFrancisIcon from '../components/otherprayers/stfrancis/stfrancis_icon.png';
import StMichaelPrayer from "../components/otherprayers/stmichaelprayer/StMichaelPrayer";
import stMichaelIcon from '../components/otherprayers/stmichaelprayer/stmichael_icon.png';
import DivineMercy from "../components/otherprayers/divinemercy/DivineMercy";
import divineMercyIcon from '../components/otherprayers/divinemercy/divinemercy_icon.png';
import Confession from "../components/confession/Confession";
import confessionIcon from '../components/confession/confession_icon.png';
import Mass from "../components/mass/Mass";
import massIcon from '../components/mass/mass_icon.png';
import Rosary from "../components/rosary/Rosary";
import rosaryIcon from '../components/rosary/rosary_icon.png';

import "./Prayers.css"; // Ensure you have this CSS file

const Prayers = () => {
    const { modalState, toggleModal } = useModal(); // Import from context
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
        { id: 'rosary', name: 'Rosary', icon: rosaryIcon, component: <Rosary /> },
        { id: 'mass', name: 'Mass', icon: massIcon, component: <Mass /> },
        { id: 'confession', name: 'Confession', icon: confessionIcon, component: <Confession /> },
        { id: 'divineMercy', name: 'Divine Mercy', icon: divineMercyIcon, component: <DivineMercy /> },
        { id: 'stMichaelPrayer', name: 'St. Michael Prayer', icon: stMichaelIcon, component: <StMichaelPrayer /> },
        { id: 'stfrancis', name: 'St. Francis Prayer', icon: stFrancisIcon, component: <StFrancisPrayer /> },
        { id: 'stleandroruiz', name: 'St. Leandro Ruiz Prayer', icon: stLeandroRuizIcon, component: <StLeandroRuizPrayer /> },
        { 
            id: 'prayerSettings', 
            name: 'Prayer Settings',
            icon: prayerSettingsIcon, 
            component: <PrayerSettings availablePrayers={availablePrayers} setAvailablePrayers={setAvailablePrayers} />
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
        <>
            <div className="prayers-container">
                <div className="prayers-content">
                    <div className="row justify-content-center align-items-center">
                        {
                            firstName ?
                            <><h2 className="header-font mt-2">{firstName}'s Prayers</h2></>
                            : <><h2 className="header-font mt-2">My Prayers</h2></>
                        }
                    </div>
                    <PrayerIcons
                        icons={icons}
                        setIcons={setIcons}
                        availablePrayers={availablePrayers}
                        setAvailablePrayers={setAvailablePrayers}
                        toggleModal={toggleModal}
                        modalState={modalState}
                    />
                </div>
            </div>
            {modalState.prayerSettings && (
                <PrayerSettingsModal
                    availablePrayers={availablePrayers}
                    onVisibilityChange={handlePrayerVisibilityChange}
                />
            )}
        </>
    );
}

export default Prayers;
