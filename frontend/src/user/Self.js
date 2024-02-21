// Self.js
import React, { useState, useEffect } from 'react';
import { isAuthenticated } from "../api/auth";
import { getPrayerSettings, updatePrayerSettings } from "../api/user";
import { useModal } from "../context/ModalContext";
import { 
    defaultPrayerSettings,
    fetchPrayerSettings,
    persistPrayerSettings,
    handlePrayerVisibilityChange,
    onDragStart,
    onDrop,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    eventOptions,
} from './god/helpers';
import Modal from './Modal';
import Rosary from '../components/rosary/Rosary';
import rosaryIcon from '../components/rosary/rosary_icon.png'
import Mass from "../components/mass/Mass";
import massIcon from '../components/mass/mass_icon.png'
import Confession from "../components/confession/Confession"; // Import the Confession component
import confessionIcon from '../components/confession/confession_icon.png'; // Path to your confession icon
import DivineMercy from "../components/otherprayers/divinemercy/DivineMercy";
import divineMercyIcon from '../components/otherprayers/divinemercy/divinemercy_icon.png'; // Path to your Divine Mercy icon
import prayerSettingsIcon from '../components/otherprayers/prayersettings_icon.png'
import PrayerSettings from "../components/otherprayers/PrayerSettings";
import StMichaelPrayer from "../components/otherprayers/stmichaelprayer/StMichaelPrayer";
import stMichaelIcon from '../components/otherprayers/stmichaelprayer/stmichael_icon.png';
import StFrancisPrayer from "../components/otherprayers/stfrancis/StFrancisPrayer";
import stFrancisIcon from "../components/otherprayers/stfrancis/stfrancis_icon.png";
import StLeandroRuizPrayer from "../components/otherprayers/stleandroruiz/StLeandroRuiz";
import stLeandroRuizIcon from "../components/otherprayers/stleandroruiz/stleandroruiz_icon.png";
import './styles.css'

const Self = ({setBackgroundColor}) => {
    const { modalState, toggleModal } = useModal(); // Import from context
    const [availablePrayers, setAvailablePrayers] = useState([]); // Define available prayers with visibility control
    const [icons, setIcons] = useState([
        { id: 'rosary', name: 'Rosary', icon: rosaryIcon, component: <Rosary /> },
        { id: 'mass', name: 'Mass', icon: massIcon, component: <Mass /> },
        { id: 'confession', name: 'Confession', icon: confessionIcon, component: <Confession /> },
        { id: 'divineMercy', name: 'Divine Mercy', icon: divineMercyIcon, component: <DivineMercy /> }, // Updated ID
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

    const { user: { firstName, _id: userId }, token } = isAuthenticated();

    useEffect(() => {
        fetchPrayerSettings(userId, token, getPrayerSettings, updatePrayerSettings, setAvailablePrayers);
        setBackgroundColor('#B2E7EC'); // Set the background color for God component
    }, [setBackgroundColor]);


    return (
        <>
            <div className="d-flex flex-wrap justify-content-center mt-4">
                {icons.map(icon => {
                                    
                    // Check if the prayer is visible
                    const isVisible = availablePrayers.find(prayer => prayer.id === icon.id)?.isVisible ?? true;

                    return isVisible && (
                        <div 
                            key={icon.id} 
                            className="icon-container p-2"
                            draggable 
                            onDragStart={(e) => onDragStart(e, icon.id)}
                            onDrop={(e) => onDrop(e, icon.id, icons, setIcons)}
                            onDragOver={(e) => e.preventDefault()}
                            onClick={() => toggleModal(icon.id)}
                            onTouchStart={(e) => handleTouchStart(e, icon.id)}
                            onTouchMove={(e) => handleTouchMove(e, icon.id, eventOptions)}
                            onTouchEnd={(e) => handleTouchEnd(e, icon.id)}
                        >
                            <img 
                                src={icon.icon} 
                                alt={icon.id} 
                                title={icon.name}
                                className="clickable-icon"
                                style={{ height: '55px', width: '55px' }}
                            />
                            <div className="icon-label">
                                {icon.name.charAt(0).toUpperCase() + icon.name.slice(1, 10)} {/* Only show the first 10 characters */}
                                {icon.name.length > 10 ? "..." : ""} {/* Add ellipsis if the text is longer than 10 characters */}
                            </div>
                            {modalState[icon.id] && (
                                <Modal id={icon.id}>
                                    {icon.component}
                                </Modal>
                            )}
                        </div>
                    )
                }
                )}
            </div>
            
            {/* Modal for Prayer Settings */}
            {modalState.prayerSettings && (
                <Modal id="prayerSettings">
                    <PrayerSettings availablePrayers={availablePrayers} onVisibilityChange={handlePrayerVisibilityChange} setAvailablePrayers={setAvailablePrayers} />
                </Modal>
            )}
        </>
    );
};

export default Self;
