// src/components/utils/BackIcon.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5'; // Using react-icons for the back arrow

const BackIcon = () => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate('/prayers')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <IoArrowBack size={24} />
            <span style={{ marginLeft: '8px' }}>Back to Prayers</span>
        </div>
    );
};

export default BackIcon;
