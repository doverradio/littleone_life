import React, { useState }  from "react";
import NavbarMain from "../NavbarMain";
import Footer from "../Footer";
import Modal from "./Modal";
import Rosary from "../components/rosary/Rosary";
import rosaryIcon from '../components/rosary/rosary_icon.png'
import Mass from "../components/mass/Mass";
import massIcon from '../components/mass/mass_icon.png'
import Confession from "../components/confession/Confession"; // Import the Confession component
import confessionIcon from '../components/confession/confession_icon.png'; // Path to your confession icon
import DivineMercy from "../components/divinemercy/DivineMercy";
import divineMercyIcon from '../components/divinemercy/divinemercy_icon.png'; // Path to your Divine Mercy icon
import './styles.css'
import { useModal } from "../context/ModalContext";
import { isAuthenticated } from "../api/auth";

const UserDashboard = () => {
    
    const { modalState, toggleModal } = useModal(); // Import from context

    const {
        user: { firstName }
    } = isAuthenticated();
    
    const [icons, setIcons] = useState([
        { id: 'rosary', icon: rosaryIcon, component: <Rosary /> },
        { id: 'mass', icon: massIcon, component: <Mass /> },
        { id: 'confession', icon: confessionIcon, component: <Confession /> },
        { id: 'divine Mercy Chaplet', icon: divineMercyIcon, component: <DivineMercy /> } 
    ]);
    
    
    // Function to handle icon click and toggle modal
    const handleIconClick = (id) => {
        toggleModal(id);
    };

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
                    <h2 className="header-font mt-2">{firstName}'s Faith Journey</h2>
                    {/* Add your user dashboard content here */}
                </div>
                <div className="d-flex flex-wrap justify-content-start">
                    {icons.map(icon => (
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
                                className="clickable-icon"
                                style={{ height: '55px', width: '55px' }}
                            />
                            <div className="icon-label">
                                {icon.id.charAt(0).toUpperCase() + icon.id.slice(1, 10)} {/* Only show the first 10 characters */}
                                {icon.id.length > 10 ? "..." : ""} {/* Add ellipsis if the text is longer than 10 characters */}
                            </div>
                            {modalState[icon.id] && (
                                <Modal id={icon.id}>
                                    {icon.component}
                                </Modal>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UserDashboard;
