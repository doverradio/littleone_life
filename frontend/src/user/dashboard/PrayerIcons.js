import React from "react";
import Modal from "../Modal";

const PrayerIcons = ({ icons, setIcons, availablePrayers, toggleModal, modalState }) => {

    // Handle drag start event
    const onDragStart = (e, id) => {
        e.dataTransfer.setData('id', id);
    };

    // Handle drop event
    const onDrop = (e, targetId) => {
        const id = e.dataTransfer.getData('id');
        const draggedIcon = icons.find(icon => icon.id === id);
        const targetIconIndex = icons.findIndex(icon => icon.id === targetId);

        const newIcons = [...icons];
        newIcons.splice(icons.indexOf(draggedIcon), 1);
        newIcons.splice(targetIconIndex, 0, draggedIcon);

        setIcons(newIcons);
    };

    // Handle touch start event
    const handleTouchStart = (e, iconId) => {
        const touchLocation = e.targetTouches[0];
    };

    // Handle touch move event
    const handleTouchMove = (e, iconId, options) => {
        e.preventDefault();
        const touchLocation = e.targetTouches[0];
    };

    // Handle touch end event
    const handleTouchEnd = (e, iconId) => {};

    const eventOptions = { passive: false };

    return (
        <div className="d-flex flex-wrap justify-content-start">
            {icons.map(icon => {
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
                            {icon.name.charAt(0).toUpperCase() + icon.name.slice(1, 10)} 
                            {icon.name.length > 10 ? "..." : ""}
                        </div>
                        {modalState[icon.id] && (
                            <Modal id={icon.id}>
                                {icon.component}
                            </Modal>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default PrayerIcons;
