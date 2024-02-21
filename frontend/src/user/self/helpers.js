
export const defaultPrayerSettings = [
    { id: 'rosary', name: 'Rosary', isVisible: true },
    { id: 'mass', name: 'Mass', isVisible: true },
    { id: 'confession', name: 'Confession', isVisible: true },
    { id: 'divineMercy', name: 'Divine Mercy', isVisible: false },
    { id: 'stMichaelPrayer', name: 'St. Michael Prayer', isVisible: false },
    { id: 'stfrancis', name: 'St. Francis Prayer', isVisible: false },
    { id: 'stleandroruiz', name: 'St. Leandro Ruiz Prayer', isVisible: false },
    // Add other prayers here
]

export const fetchPrayerSettings = async (userId, token, getPrayerSettings, updatePrayerSettings, setAvailablePrayers) => {
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

// Function to update prayer settings in the database
export const persistPrayerSettings = async (userId, updatedPrayers, updatePrayerSettings) => {
    try {
        const response = await updatePrayerSettings(userId, updatedPrayers);
        // console.log(response); // Handle the response appropriately
    } catch (error) {
        console.error('Error updating prayer settings:', error);
        // Handle errors (e.g., show a notification to the user)
    }
};

// Function to handle changes in prayer visibility
export const handlePrayerVisibilityChange = (prayerId, isVisible, setAvailablePrayers) => {
    setAvailablePrayers(prevPrayers => {
        const updatedPrayers = prevPrayers.map(
            prayer => prayer.id === prayerId ? { ...prayer, isVisible } : prayer
        );
        persistPrayerSettings(updatedPrayers); // Persist the updated settings
        return updatedPrayers;
    });
};

export const onDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
};

export const onDrop = (e, targetId, icons, setIcons) => {
    const id = e.dataTransfer.getData('id');
    const draggedIcon = icons.find(icon => icon.id === id);
    const targetIconIndex = icons.findIndex(icon => icon.id === targetId);

    const newIcons = [...icons];
    newIcons.splice(icons.indexOf(draggedIcon), 1); // Remove the dragged icon
    newIcons.splice(targetIconIndex, 0, draggedIcon); // Insert the dragged icon before the target icon

    setIcons(newIcons);
};

export const handleTouchStart = (e, iconId) => {
    const touchLocation = e.targetTouches[0];
    // You may want to set the initial touch location state here
};

export const handleTouchMove = (e, iconId, options) => {
    e.preventDefault(); // Prevent scrolling when touching and moving
    const touchLocation = e.targetTouches[0];
    // Update the position of the icon based on the touch location
    // You may need to translate touch positions to your icon's positioning logic
};

export const handleTouchEnd = (e, iconId) => {
    // Handle the drop logic when the touch ends
};

export const eventOptions = { passive: false };