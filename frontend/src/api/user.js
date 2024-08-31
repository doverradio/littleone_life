const API = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'https://www.littleone.life/api';

export const updatePrayerSettings = async (userId, prayerSettings) => {
    try {
        const response = await fetch(`${API}/user/update-prayer-settings`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, prayerSettings }),
            credentials: 'include' // Ensure cookies are sent with the request
        });

        if (!response.ok) {
            throw new Error('Failed to update prayer settings');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in updatePrayerSettings:', error);
        throw error;
    }
};


export const getPrayerSettings = async (userId) => {
    try {
        const response = await fetch(`${API}/user/prayer-settings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
            credentials: 'include' // Ensure cookies are sent with the request
        });
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching prayer settings:', error);
        throw error;
    }
};



export const getUserSettings = async (_id) => {
    try {
        const response = await fetch(`${API}/user/settings`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id }),
            credentials: 'include'
        });
        return await response.json();
    } catch (err) {
        console.error('Error fetching user settings:', err);
        return { error: 'Error fetching user settings' };
    }
};

export const updateUserSettings = async (settings) => {
    try {
        const response = await fetch(`${API}/user/settings`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings),
            credentials: 'include'
        });
        return await response.json();
    } catch (err) {
        console.error('Error updating user settings:', err);
        return { error: 'Error updating user settings' };
    }
};

// New API call to get user prayer stats
export const getUserPrayerStats = async (userId) => {
    try {
        const response = await fetch(`${API}/user/stats/${userId}`, {
            method: 'GET',
            credentials: 'include', // This ensures cookies (and hence session data) are included
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user stats');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching user stats:', error);
        throw error;
    }
};


export const getTokenUsage = async (userId) => {
    try {
        const response = await fetch(`${API}/user/token-usage/${userId}`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch token usage');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching token usage:', error);
        throw error;
    }
};

export const getUser = async (userId, token) => {
    try {
        const response = await fetch(`${API}/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        
        if (!response.ok) {
            throw new Error(`Error fetching user data: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};