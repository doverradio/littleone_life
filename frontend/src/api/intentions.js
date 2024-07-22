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
        const response = await fetch(`${API}/intention/getintention`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ _id: intentionId })
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
        const response = await fetch(`${API}/intention/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({_id: intentionId, ...intentionData}),
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
        // console.log('Token:', token); // Log the token to debug
        const response = await fetch(`${API}/intention/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ _id: intentionId })
        });
        if (!response.ok) {
            throw new Error('Failed to delete intention');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in deleteIntention:', error);
        throw error;
    }
};

