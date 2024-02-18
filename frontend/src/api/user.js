const API = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'https://www.littleone.life/api';

export const updatePrayerSettings = async (userId, prayerSettings, token) => {
    try {
        const response = await fetch(`${API}/user/update-prayer-settings`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Adjust according to your authentication method
            },
            body: JSON.stringify({ userId, prayerSettings })
        });
        return await response.json();
    } catch (error) {
        console.error('Error in updatePrayerSettings:', error);
        throw error;
    }
};

export const getPrayerSettings = async (userId, token) => {
    try {
        const response = await fetch(`${API}/user/prayer-settings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId })
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching prayer settings:', error);
        throw error;
    }
};