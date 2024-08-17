// God.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../api/authHook';
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

const God = ({setBackgroundColor}) => {
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
    
    const [contextMenu, setContextMenu] = useState({
            visible: false,
            x: 0,
            y: 0,
            iconId: null
        });


        const { user, token } = useAuth();
        const { _id } = user || {};
        const userId = _id;

    useEffect(() => {
        const defaultIconId = localStorage.getItem('defaultIcon');
        if (defaultIconId) {
            setActiveIcon(defaultIconId);
        }
        fetchPrayerSettings(userId, token, getPrayerSettings, updatePrayerSettings, setAvailablePrayers);
        setBackgroundColor('#dff9fb'); // Set the background color for God component
        return () => setBackgroundColor('white'); // Reset to white when component unmounts
    }, [setBackgroundColor]); // Empty dependency array to run only once on component mount

    const iconData = [
        { id: 'rosary', name: 'Rosary', icon: rosaryIcon, component: Rosary },
        { id: 'mass', name: 'Mass', icon: massIcon, component: Mass },
        { id: 'confession', name: 'Confession', icon: confessionIcon, component: Confession },
        { id: 'divineMercy', name: 'Divine Mercy', icon: divineMercyIcon, component: DivineMercy },
        { id: 'stMichaelPrayer', name: 'St. Michael Prayer', icon: stMichaelIcon, component: StMichaelPrayer },
        { id: 'stfrancis', name: 'St. Francis Prayer', icon: stFrancisIcon, component: StFrancisPrayer },
        { id: 'stleandroruiz', name: 'St. Leandro Ruiz Prayer', icon: stLeandroRuizIcon, component: StLeandroRuizPrayer },
        { id: 'prayerSettings', name: 'Prayer Settings', icon: prayerSettingsIcon, component: PrayerSettings },
    ];

    // Handle Right Click (Desktop) and Long Press (Mobile)
    const handleContextMenu = (event, iconId) => {
        event.preventDefault();
        setContextMenu({
            visible: true,
            x: event.clientX,
            y: event.clientY,
            iconId: iconId
        });
    };
    
    const handleLongPress = (iconId) => {
        // For mobile view, set the position where you want the menu to appear
        setContextMenu({
            visible: true,
            x: 100, // Example position, adjust as needed
            y: 100, // Example position, adjust as needed
            iconId: iconId
        });
    };
    

    const handleIconClick = (iconId) => {
        setActiveIcon(activeIcon === iconId ? null : iconId);
    };
    
    // Event handler to open the modal
    const openPrayerSettingsModal = () => {
        togglePrayerSettingsModal();
    };

    const setAsDefault = (iconId) => {
        // Logic to handle setting an icon as default
        localStorage.setItem('defaultIcon', iconId);
    
        // Close the context menu
        setContextMenu({ ...contextMenu, visible: false });
    
        // Optionally, you might want to set this icon as active immediately
        setActiveIcon(iconId);
    };

    return (
        <>
            <div className="d-flex flex-wrap justify-content-center mt-5">
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
                })}
            </div>

            {/* Render the Context Menu */}
            {contextMenu.visible && (
                <div
                    style={{
                        position: 'absolute',
                        top: `${contextMenu.y}px`,
                        left: `${contextMenu.x}px`
                    }}
                >
                    <ul>
                        <li onClick={() => setAsDefault(contextMenu.iconId)}>Set as Default</li>
                        {/* Add other menu items here */}
                    </ul>
                </div>
            )}
            
        {/* Render content of the active icon in a card */}
        {activeIcon && (
            <div className="card">
                <div className="card-body">
                    {/* {icons.find(icon => icon.id === activeIcon)?.component} */}
                    {iconData.map(icon => {
                        const Component = icon.component; // Get the component constructor
                        return (
                            <div key={icon.id} className="icon-container p-2" onClick={() => handleIconClick(icon.id)}>
                                {/* <img src={icon.icon} alt={icon.name} className="clickable-icon" style={{ height: '55px', width: '55px' }} />
                                <div className="icon-label">{icon.name}</div> */}
                                {activeIcon === icon.id && (
                                    <Component availablePrayers={availablePrayers} onVisibilityChange={handlePrayerVisibilityChange} setAvailablePrayers={setAvailablePrayers} />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        )}
        
        </>
    );
};

export default God;
