import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPrayerSpace } from '../../api/prayerSpaces';

const PrayerButton = ({ prayerType }) => {
    const navigate = useNavigate();

    const handleCreateRequest = async () => {
        try {
            const prayerSpace = await createPrayerSpace(`${prayerType} Prayer Space`);
            const spaceId = prayerSpace._id;
            console.log(`Created prayer space with ID: ${spaceId}`);
            navigate(`/prayer-space/${spaceId}`);
        } catch (error) {
            console.error('Error creating prayer space:', error);
        }
    };

    return (
        <button onClick={handleCreateRequest} className="btn btn-primary">
            Start Instant Prayer Army
        </button>
    );
};

export default PrayerButton;
