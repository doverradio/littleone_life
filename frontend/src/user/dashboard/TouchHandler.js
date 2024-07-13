export const handleTouchStart = (e, iconId) => {
    const touchLocation = e.targetTouches[0];
};

export const handleTouchMove = (e, iconId, options) => {
    e.preventDefault();
    const touchLocation = e.targetTouches[0];
};

export const handleTouchEnd = (e, iconId) => {
};
