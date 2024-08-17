import React, { useState, useEffect } from "react";
import NavbarMain from "../NavbarMain";
import Footer from "../Footer";
import Modal from "./Modal";
import Rosary from "../components/rosary/Rosary";
import rosaryIcon from '../components/rosary/rosary_icon.png';
import Mass from "../components/mass/Mass";
import massIcon from '../components/mass/mass_icon.png';
import Confession from "../components/confession/Confession";
import confessionIcon from '../components/confession/confession_icon.png';
import DivineMercy from "../components/otherprayers/divinemercy/DivineMercy";
import divineMercyIcon from '../components/otherprayers/divinemercy/divinemercy_icon.png';
import prayerSettingsIcon from '../components/otherprayers/prayersettings_icon.png';
import './styles.css';
import { useModal } from "../context/ModalContext";
import { useAuth } from '../api/authHook';
import { getPrayerSettings, updatePrayerSettings } from "../api/user";
import PrayerSettings from "../components/otherprayers/PrayerSettings";
import StMichaelPrayer from "../components/otherprayers/stmichaelprayer/StMichaelPrayer";
import stMichaelIcon from '../components/otherprayers/stmichaelprayer/stmichael_icon.png';
import StFrancisPrayer from "../components/otherprayers/stfrancis/StFrancisPrayer";
import stFrancisIcon from "../components/otherprayers/stfrancis/stfrancis_icon.png";
import StLeandroRuizPrayer from "../components/otherprayers/stleandroruiz/StLeandroRuiz";
import stLeandroRuizIcon from "../components/otherprayers/stleandroruiz/stleandroruiz_icon.png";

const UserDashboard = () => {
    const { modalState, toggleModal } = useModal(); // Import from context
    const { user, token } = useAuth();
    const { _id } = user || {};
    const userId = _id;
    
    // Define available prayers with visibility control
    const [availablePrayers, setAvailablePrayers] = useState([]);

    const defaultPrayerSettings = [
        { id: 'rosary', name: 'Rosary', isVisible: true },
        { id: 'mass', name: 'Mass', isVisible: true },
        { id: 'confession', name: 'Confession', isVisible: true },
        { id: 'divineMercy', name: 'Divine Mercy', isVisible: false },
        { id: 'stMichaelPrayer', name: 'St. Michael Prayer', isVisible: false },
        { id: 'stfrancis', name: 'St. Francis Prayer', isVisible: false },
        { id: 'stleandroruiz', name: 'St. Leandro Ruiz Prayer', isVisible: false },
        // Add other prayers here
    ];

    const fetchPrayerSettings = async () => {
        try {
            const settings = await getPrayerSettings(userId, token);
            if (settings.length === 0) {
                // Initialize settings if empty
                await updatePrayerSettings(userId, defaultPrayerSettings, token);
                const updatedSettings = await getPrayerSettings(userId, token);
                setAvailablePrayers(updatedSettings);
            } else {
                // Use fetched settings
                setAvailablePrayers(settings);
            }
        } catch (error) {
            console.error("Error fetching prayer settings:", error);
            // Handle error appropriately
        }
    };

    useEffect(() => {
        fetchPrayerSettings();
    }, []); // Empty dependency array to run only once on component mount

    // Function to update prayer settings in the database
    const persistPrayerSettings = async (updatedPrayers) => {
        try {
            const response = await updatePrayerSettings(userId, updatedPrayers, token);
            // console.log(response); // Handle the response appropriately
        } catch (error) {
            console.error('Error updating prayer settings:', error);
            // Handle errors (e.g., show a notification to the user)
        }
    };

    // Function to handle changes in prayer visibility
    const handlePrayerVisibilityChange = (prayerId, isVisible) => {
        setAvailablePrayers(prevPrayers => {
            const updatedPrayers = prevPrayers.map(
                prayer => prayer.id === prayerId ? { ...prayer, isVisible } : prayer
            );
            persistPrayerSettings(updatedPrayers); // Persist the updated settings
            return updatedPrayers;
        });
    };

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

    const onDragStart = (e, id) => {
        e.dataTransfer.setData('id', id);
    };

    const onDrop = (e, targetId) => {
        const id = e.dataTransfer.getData('id');
        const draggedIcon = icons.find(icon => icon.id === id);
        const targetIconIndex = icons.findIndex(icon => icon.id === targetId);

        const newIcons = [...icons];
        newIcons.splice(icons.indexOf(draggedIcon), 1); // Remove the dragged icon
        newIcons.splice(targetIconIndex, 0, draggedIcon); // Insert the dragged icon before the target icon

        setIcons(newIcons);
    };

    const handleTouchStart = (e, iconId) => {
        const touchLocation = e.targetTouches[0];
        // You may want to set the initial touch location state here
    };
    
    const handleTouchMove = (e, iconId, options) => {
        e.preventDefault(); // Prevent scrolling when touching and moving
        const touchLocation = e.targetTouches[0];
        // Update the position of the icon based on the touch location
        // You may need to translate touch positions to your icon's positioning logic
    };

    const handleTouchEnd = (e, iconId) => {
        // Handle the drop logic when the touch ends
    };

    const eventOptions = { passive: false };

    return (
        <>
            <NavbarMain />
            <div className="container" style={{ height: '73vh' }}>
                <div className="row justify-content-center align-items-center">
                    {
                        firstName ?
                        <><h2 className="header-font mt-2">{firstName}'s Faith Journey</h2></>
                        : <><h2 className="header-font mt-2">My Faith Journey</h2></>
                    }
                    {/* Display the user role */}
                    {/* <p>User Role: {user?.role}</p> */}
                    {/* Add your user dashboard content here */}
                </div>
                <div className="d-flex flex-wrap justify-content-start">
                    {icons.map(icon => {
                        // Check if the prayer is visible
                        const isVisible = availablePrayers.find(prayer => prayer.id === icon.id)?.isVisible ?? true;

                        return isVisible && (
                            <div 
                                key={icon.id} 
                                className="icon-container p-2"
                                draggable 
                                onDragStart={(e) => onDragStart(e, icon.id)}
                                onDrop={(e) => onDrop(e, icon.id)}
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
            </div>
            {/* Modal for Prayer Settings */}
            {modalState.prayerSettings && (
                <Modal id="prayerSettings">
                    <PrayerSettings availablePrayers={availablePrayers} onVisibilityChange={handlePrayerVisibilityChange} />
                </Modal>
            )}
            <Footer />
        </>
    );    
}

export default UserDashboard;
