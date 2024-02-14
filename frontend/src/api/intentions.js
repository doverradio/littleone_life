const API = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'https://www.littleone.life/api';

// Function to create a new intention
export const createIntention = async (intention, token) => {
    try {
        const response = await fetch(`${API}/intention`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(intention),
        });
        return await response.json();
    } catch (error) {
        console.error('Error in createIntention:', error);
        throw error;
    }
};

// Function to get all intentions for a user
export const getAllIntentions = async (userId, type, token) => {
    try {
        const response = await fetch(`${API}/intentions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId, type }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error in getAllIntentions:', error);
        throw error;
    }
};

// Function to get a single intention by ID
export const getIntentionById = async (intentionId, token) => {
    try {
        const response = await fetch(`${API}/intention/${intentionId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error in getIntentionById:', error);
        throw error;
    }
};

// Function to update an intention
export const updateIntention = async (intentionId, intentionData, token) => {
    try {
        const response = await fetch(`${API}/intention/${intentionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(intentionData),
        });
        return await response.json();
    } catch (error) {
        console.error('Error in updateIntention:', error);
        throw error;
    }
};

// Function to delete an intention
export const deleteIntention = async (intentionId, token) => {
    try {
        const response = await fetch(`${API}/intention/${intentionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error in deleteIntention:', error);
        throw error;
    }
};
