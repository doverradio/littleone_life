// DynamicBackground.js
import React from 'react';

const DynamicBackground = ({ color }) => {
    const backgroundStyle = {
        backgroundColor: color,
        transition: 'background-color 4s ease', // Adjust the time here
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
    };

    return <div style={backgroundStyle} />;
};

export default DynamicBackground;
