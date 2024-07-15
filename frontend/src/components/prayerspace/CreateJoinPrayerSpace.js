import React, { useState } from 'react';
import axios from 'axios';

const CreateJoinPrayerSpace = () => {
    const [spaceName, setSpaceName] = useState('');
    const [spaceId, setSpaceId] = useState('');

    const createSpace = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/prayer-spaces/create`, { name: spaceName });
            console.log('Prayer space created:', response.data);
        } catch (error) {
            console.error('Error creating prayer space:', error);
        }
    };

    const joinSpace = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/prayer-spaces/join`, { spaceId, userId: 'yourUserId' });
            console.log('Joined prayer space:', response.data);
        } catch (error) {
            console.error('Error joining prayer space:', error);
        }
    };

    return (
        <div>
            <h2>Create or Join a Prayer Space</h2>
            <div>
                <input
                    type="text"
                    placeholder="Space Name"
                    value={spaceName}
                    onChange={(e) => setSpaceName(e.target.value)}
                />
                <button onClick={createSpace}>Create Space</button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Space ID"
                    value={spaceId}
                    onChange={(e) => setSpaceId(e.target.value)}
                />
                <button onClick={joinSpace}>Join Space</button>
            </div>
        </div>
    );
};

export default CreateJoinPrayerSpace;
