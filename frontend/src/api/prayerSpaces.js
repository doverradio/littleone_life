const API = process.env.REACT_APP_API || 'https://www.littleone.life/api'; // Your backend API URL

export const createPrayerSpace = async (name) => {
    try {
        const response = await fetch(`${API}/prayer-spaces/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error creating prayer space:', error);
        throw error;
    }
};

export const joinPrayerSpace = async (spaceId, userId) => {
    try {
        const response = await fetch(`${API}/prayer-spaces/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ spaceId, userId }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error joining prayer space:', error);
        throw error;
    }
};

export const getPrayerSpace = async (id) => {
    try {
        const response = await fetch(`${API}/prayer-spaces/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching prayer space:', error);
        throw error;
    }
};
